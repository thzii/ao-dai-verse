import { ethers } from 'ethers'
import { create } from 'ipfs-http-client'
import { NFTMetadata, TransferRecord, RoyaltyRecipient, BLOCKCHAIN_NETWORKS } from '../types'

// IPFS Configuration
const ipfs = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
})

// Smart Contract ABI (simplified for Ao Dai NFT)
const NFT_CONTRACT_ABI = [
  'function mint(address to, string memory tokenURI) public returns (uint256)',
  'function transferFrom(address from, address to, uint256 tokenId) public',
  'function ownerOf(uint256 tokenId) public view returns (address)',
  'function tokenURI(uint256 tokenId) public view returns (string)',
  'function setApprovalForAll(address operator, bool approved) public',
  'function isApprovedForAll(address owner, address operator) public view returns (bool)',
  'event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)',
]

export interface BlockchainConfig {
  network: keyof typeof BLOCKCHAIN_NETWORKS
  contractAddress: string
  rpcUrl: string
  chainId: number
}

export interface MintNFTParams {
  to: string
  metadata: NFTMetadata
  royalties?: RoyaltyRecipient[]
}

export interface TransferNFTParams {
  from: string
  to: string
  tokenId: string
}

class BlockchainService {
  private provider: ethers.providers.JsonRpcProvider | null = null
  private signer: ethers.Signer | null = null
  private contract: ethers.Contract | null = null
  private config: BlockchainConfig | null = null

  // Initialize blockchain connection
  async initialize(config: BlockchainConfig): Promise<void> {
    try {
      this.config = config
      this.provider = new ethers.providers.JsonRpcProvider(config.rpcUrl)
      
      // Check if MetaMask is available
      if (typeof window !== 'undefined' && window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        this.signer = this.provider.getSigner()
      }
      
      this.contract = new ethers.Contract(
        config.contractAddress,
        NFT_CONTRACT_ABI,
        this.signer || this.provider
      )
    } catch (error) {
      console.error('Failed to initialize blockchain service:', error)
      throw new Error('Không thể kết nối blockchain')
    }
  }

  // Connect wallet
  async connectWallet(): Promise<string> {
    if (!window.ethereum) {
      throw new Error('MetaMask không được cài đặt')
    }

    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })
      
      if (accounts.length > 0) {
        this.signer = this.provider!.getSigner()
        this.contract = new ethers.Contract(
          this.config!.contractAddress,
          NFT_CONTRACT_ABI,
          this.signer
        )
        return accounts[0]
      }
      
      throw new Error('Không có tài khoản nào được kết nối')
    } catch (error) {
      console.error('Failed to connect wallet:', error)
      throw new Error('Không thể kết nối ví')
    }
  }

  // Get connected account
  async getConnectedAccount(): Promise<string | null> {
    if (!this.signer) return null
    
    try {
      return await this.signer.getAddress()
    } catch (error) {
      return null
    }
  }

  // Upload metadata to IPFS
  async uploadMetadata(metadata: Omit<NFTMetadata, 'tokenId' | 'contractAddress' | 'blockchain'>): Promise<string> {
    try {
      const result = await ipfs.add(JSON.stringify(metadata))
      return `ipfs://${result.path}`
    } catch (error) {
      console.error('Failed to upload metadata to IPFS:', error)
      throw new Error('Không thể tải metadata lên IPFS')
    }
  }

  // Mint NFT
  async mintNFT(params: MintNFTParams): Promise<{ tokenId: string; transactionHash: string }> {
    if (!this.contract || !this.signer) {
      throw new Error('Chưa kết nối blockchain')
    }

    try {
      // Upload metadata to IPFS
      const tokenURI = await this.uploadMetadata(params.metadata)
      
      // Mint NFT
      const tx = await this.contract.mint(params.to, tokenURI)
      const receipt = await tx.wait()
      
      // Get token ID from event
      const transferEvent = receipt.events?.find((event: any) => event.event === 'Transfer')
      const tokenId = transferEvent?.args?.tokenId?.toString()
      
      if (!tokenId) {
        throw new Error('Không thể lấy token ID')
      }
      
      return {
        tokenId,
        transactionHash: receipt.transactionHash,
      }
    } catch (error) {
      console.error('Failed to mint NFT:', error)
      throw new Error('Không thể tạo NFT')
    }
  }

  // Transfer NFT
  async transferNFT(params: TransferNFTParams): Promise<{ transactionHash: string }> {
    if (!this.contract || !this.signer) {
      throw new Error('Chưa kết nối blockchain')
    }

    try {
      const tx = await this.contract.transferFrom(params.from, params.to, params.tokenId)
      const receipt = await tx.wait()
      
      return {
        transactionHash: receipt.transactionHash,
      }
    } catch (error) {
      console.error('Failed to transfer NFT:', error)
      throw new Error('Không thể chuyển NFT')
    }
  }

  // Get NFT owner
  async getNFTOwner(tokenId: string): Promise<string> {
    if (!this.contract) {
      throw new Error('Chưa kết nối blockchain')
    }

    try {
      return await this.contract.ownerOf(tokenId)
    } catch (error) {
      console.error('Failed to get NFT owner:', error)
      throw new Error('Không thể lấy thông tin chủ sở hữu NFT')
    }
  }

  // Get NFT metadata
  async getNFTMetadata(tokenId: string): Promise<NFTMetadata> {
    if (!this.contract) {
      throw new Error('Chưa kết nối blockchain')
    }

    try {
      const tokenURI = await this.contract.tokenURI(tokenId)
      
      // Fetch metadata from IPFS
      const response = await fetch(tokenURI.replace('ipfs://', 'https://ipfs.io/ipfs/'))
      const metadata = await response.json()
      
      return {
        tokenId,
        contractAddress: this.config!.contractAddress,
        blockchain: this.config!.network,
        metadata,
        ownership: {
          owner: await this.getNFTOwner(tokenId),
          creator: metadata.creator || '',
          transferHistory: [], // Would need to fetch from events
        },
        royalties: metadata.royalties || [],
      }
    } catch (error) {
      console.error('Failed to get NFT metadata:', error)
      throw new Error('Không thể lấy metadata NFT')
    }
  }

  // Get transfer history
  async getTransferHistory(tokenId: string): Promise<TransferRecord[]> {
    if (!this.contract) {
      throw new Error('Chưa kết nối blockchain')
    }

    try {
      const filter = this.contract.filters.Transfer(null, null, tokenId)
      const events = await this.contract.queryFilter(filter)
      
      return events.map((event: any) => ({
        from: event.args.from,
        to: event.args.to,
        timestamp: new Date(event.blockNumber * 1000), // Approximate
        transactionHash: event.transactionHash,
      }))
    } catch (error) {
      console.error('Failed to get transfer history:', error)
      throw new Error('Không thể lấy lịch sử chuyển NFT')
    }
  }

  // Check if address is approved
  async isApprovedForAll(owner: string, operator: string): Promise<boolean> {
    if (!this.contract) {
      throw new Error('Chưa kết nối blockchain')
    }

    try {
      return await this.contract.isApprovedForAll(owner, operator)
    } catch (error) {
      console.error('Failed to check approval:', error)
      return false
    }
  }

  // Approve operator
  async setApprovalForAll(operator: string, approved: boolean): Promise<{ transactionHash: string }> {
    if (!this.contract || !this.signer) {
      throw new Error('Chưa kết nối blockchain')
    }

    try {
      const tx = await this.contract.setApprovalForAll(operator, approved)
      const receipt = await tx.wait()
      
      return {
        transactionHash: receipt.transactionHash,
      }
    } catch (error) {
      console.error('Failed to set approval:', error)
      throw new Error('Không thể cấp quyền')
    }
  }

  // Get network info
  getNetworkInfo(): BlockchainConfig | null {
    return this.config
  }

  // Check if connected
  isConnected(): boolean {
    return !!(this.provider && this.contract)
  }

  // Disconnect
  disconnect(): void {
    this.provider = null
    this.signer = null
    this.contract = null
    this.config = null
  }
}

export const blockchainService = new BlockchainService()
export default blockchainService 