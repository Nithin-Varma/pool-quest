'use client'

import { useState } from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { injected } from 'wagmi/connectors'
import { Button } from "@/components/ui/button"

export default function WagmiConnectButton() {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect()
  const { disconnect } = useDisconnect()
  const [isHovering, setIsHovering] = useState(false)

  if (isConnected) {
    return (
      <Button
        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full transition-all duration-300"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={() => disconnect()}
      >
        {isHovering ? 'Disconnect' : `${address?.slice(0, 6)}...${address?.slice(-4)}`}
      </Button>
    )
  }

  return (
    <Button
      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition-all duration-300"
      onClick={() => connect({
        connector:injected()
      })}
    >
      Connect Wallet
    </Button>
  )
}