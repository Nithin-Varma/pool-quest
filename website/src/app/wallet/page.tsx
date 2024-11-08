'use client'

import { useState } from 'react'
import { useAccount, useConnect, useDisconnect,  useSendTransaction } from 'wagmi'
import { parseEther } from 'viem'
import { injected } from 'wagmi/connectors'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ArrowUpRight, ArrowDownLeft, Coins } from "lucide-react"
import {QRCodeSVG}  from 'qrcode.react'

type Token = {
  name: string
  symbol: string
  balance: string
  inPool?: boolean
}

type Pool = {
  name: string
  active: boolean
}

export default function WalletPage() {
  const [isReceiveOpen, setIsReceiveOpen] = useState(false)
  const { address, isConnected } = useAccount()
  const { connect } = useConnect()
  const { disconnect } = useDisconnect()


  const { sendTransaction } = useSendTransaction()

  const balance = 1234.56
  const tokens: Token[] = [
    { name: "Ethereum", symbol: "ETH", balance: "0.5", inPool: true },
    { name: "USD Coin", symbol: "USDC", balance: "500", inPool: true },
    { name: "Chainlink", symbol: "LINK", balance: "50" },
    { name: "Uniswap", symbol: "UNI", balance: "100" },
  ]
  const activePools: Pool[] = [
    { name: "USDC/ETH", active: true },
    { name: "LINK/ETH", active: false },
  ]
  const nextLotteryReward = 20
  const nextLotteryDate = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString()
  const winningChance = "1 in 10,000"

  const handleReceive = () => {
    setIsReceiveOpen(true)
  }

  const handleSend = () => {
    if (isConnected && sendTransaction) {
      sendTransaction({
        to: address,
        value: parseEther('0.01'),
      })
    } else {
      connect({
        connector: injected(),
      })
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans p-8">
      <h1 className="text-3xl font-bold mb-8">Your Wallet</h1>
      
      <Card className="bg-gray-800 border-gray-700 mb-8">
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold mb-2">Total Balance</h2>
          <p className="text-4xl font-bold text-green-400">${balance.toFixed(2)} USD</p>
        </CardContent>
      </Card>

      <div className="flex justify-between mb-8">
        <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={handleReceive}>
          <ArrowDownLeft className="mr-2 h-4 w-4" /> Receive
        </Button>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handleSend}>
          <ArrowUpRight className="mr-2 h-4 w-4" /> Send
        </Button>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Your Tokens</h2>
      <div className="space-y-4 mb-8">
        {tokens.map((token) => (
          <Card key={token.symbol} className="bg-gray-800 border-gray-700">
            <CardContent className="flex justify-between items-center p-4">
              <div>
                <p className="font-semibold text-white">{token.name} ({token.symbol})</p>
                <p className="text-sm text-gray-300">{token.balance} {token.symbol}</p>
              </div>
              {token.inPool && (
                <Badge variant="secondary" className="bg-purple-600 text-white">In Pool</Badge>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold">Active Pools</h2>
        <div className="space-x-2">
          {activePools.map((pool) => (
            <Badge 
              key={pool.name} 
              variant={pool.active ? "default" : "secondary"}
              className={pool.active ? "bg-green-500 text-white" : "bg-gray-500 text-white"}
            >
              {pool.name}
            </Badge>
          ))}
        </div>
      </div>

      <Card className="bg-green-800 border-green-600 mb-8">
        <CardContent className="p-6">
          <div className="flex items-center mb-2">
            <Coins className="mr-2 h-6 w-6 text-green-300" />
            <h2 className="text-2xl font-semibold text-white">Next Lottery Reward</h2>
          </div>
          <p className="text-4xl font-bold mb-2 text-green-300">{nextLotteryReward} USDC</p>
          <p className="text-sm text-green-200">Releasing on {nextLotteryDate}</p>
        </CardContent>
      </Card>

      <div className="text-center">
        <p className="text-lg font-semibold mb-2">Your Chances of Winning</p>
        <Badge variant="outline" className="text-yellow-300 border-yellow-300">
          {winningChance}
        </Badge>
      </div>

      <Dialog open={isReceiveOpen} onOpenChange={setIsReceiveOpen}>
        <DialogContent className="bg-gray-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-white">Receive Funds</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center">
            {address ? (
              <>
                <QRCodeSVG value={address} size={200} bgColor="#1F2937" fgColor="#FFFFFF" />
                <p className="mt-4 text-sm break-all text-gray-300">{address}</p>
              </>
            ) : (
              <p className="text-gray-300">Please connect your wallet to view the QR code.</p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}