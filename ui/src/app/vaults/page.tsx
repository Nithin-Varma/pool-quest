'use client'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
// import { AlertCircle, ChevronRight, ExternalLink, Info, Menu, X } from "lucide-react"
import { Info } from "lucide-react"
import Image from "next/image"
// import Link from "next/link"
import { useState } from "react"

const networks = [
  { id: "all", name: "Show All", icon: null },
  { id: "stablecoins", name: "Stablecoins", icon: null },
  { id: "eth", name: "Ethereum", icon: "/placeholder.svg" },
  { id: "op", name: "Optimism", icon: "/placeholder.svg" },
  { id: "base", name: "Base", icon: "/placeholder.svg" },
  { id: "arbitrum", name: "Arbitrum", icon: "/placeholder.svg" },
  { id: "scroll", name: "Scroll", icon: "/placeholder.svg" },
  { id: "gnosis", name: "Gnosis", icon: "/placeholder.svg" },
]

const vaults = [
  {
    id: 1,
    name: "Prize USDC",
    protocol: "Aave",
    icons: ["/placeholder.svg", "/placeholder.svg"],
    prize: 86798,
    apr: 15.7,
    aprTokens: ["OP", "POOL"],
    winChance: 75,
    totalDeposits: "2.37M",
    totalTokens: "2,408,004 USDC"
  },
  {
    id: 2,
    name: "Prize WSTETH/ETH",
    protocol: "Beefy",
    icons: ["/placeholder.svg", "/placeholder.svg"],
    prize: 86798,
    apr: 15.0,
    aprTokens: ["OP"],
    winChance: 65,
    totalDeposits: "2.26M",
    totalTokens: "369.83 vAMMV2-wstETH/WETH"
  },
  {
    id: 3,
    name: "USDC WinETH",
    protocol: "Aave",
    icons: ["/placeholder.svg", "/placeholder.svg"],
    prize: 86798,
    apr: 14.3,
    aprTokens: ["OP"],
    winChance: 55,
    totalDeposits: "2.18M",
    totalTokens: "2,210,013 USDC"
  }
]


export default function Vaults() {
    // const [showWarning, setShowWarning] = useState(true)
    const [activeNetwork, setActiveNetwork] = useState("all")
  return (
    <div className="min-h-screen bg-[#1C0B3D] text-white"> <main className="container mx-auto px-4 py-8">
    <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">
      Deposit tokens, <span className="text-[#7FFFD4]">win prizes.</span>{" "}
      <span className="block md:inline">
        Withdraw anytime, <span className="text-[#7FFFD4]">no loss</span>
      </span>
    </h1>

    {/* Network Filter */}
    <div className="overflow-auto mb-8">
      <div className="flex gap-2 min-w-max">
        {networks.map((network) => (
          <Button
            key={network.id}
            variant={activeNetwork === network.id ? "secondary" : "outline"}
            className="rounded-full"
            onClick={() => setActiveNetwork(network.id)}
          >
            {network.icon && (
              <Image src={network.icon} alt="" width={20} height={20} className="w-5 h-5 mr-2" />
            )}
            {network.name}
          </Button>
        ))}
      </div>
    </div>

    {/* Warning Banner
    {showWarning && (
      <div className="bg-[#2D1B4E] rounded-xl p-4 mb-8 flex items-center gap-4">
        <AlertCircle className="w-6 h-6 text-orange-300 shrink-0" />
        <div className="flex-1">
          <span className="font-semibold">Learn about the risks:</span>{" "}
          <span className="text-gray-300">
            PoolTogether prize vaults can be deployed by anyone.{" "}
            <Link href="#" className="text-blue-400 hover:underline inline-flex items-center gap-1">
              Know what you are depositing into
              <ExternalLink className="w-4 h-4" />
            </Link>
          </span>
        </div>
        <Link href="/terms" className="text-blue-400 hover:underline hidden md:block">
          Terms of Service
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="shrink-0"
          onClick={() => setShowWarning(false)}
        >
          <X className="w-5 h-5" />
        </Button>
      </div>
    )} */}

    {/* Desktop Vaults Table */}
    <div className="hidden md:block">
      <div className="grid grid-cols-4 gap-4 px-6 mb-4 text-gray-400">
        <div>Prize Vault</div>
        <div className="flex items-center gap-2">
          Prizes <Info className="w-4 h-4" />
        </div>
        <div className="flex items-center gap-2">
          Win Chance <Info className="w-4 h-4" />
        </div>
        <div>Total Deposits</div>
      </div>

      <div className="space-y-4">
        {vaults.map((vault) => (
          <Card
            key={vault.id}
            className="bg-[#2D1B4E] border-none p-6 rounded-xl grid grid-cols-4 items-center gap-4"
          >
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10">
                {vault.icons.map((icon, i) => (
                  <Image
                    key={i}
                    src={icon}
                    alt=""
                    width={40}
                    height={40}
                    className={`w-8 h-8 absolute ${i === 1 ? "top-1 left-1" : ""}`}
                  />
                ))}
              </div>
              <div>
                <div className="font-semibold text-white">{vault.name}</div>
                <div className="text-sm text-gray-400">{vault.protocol}</div>
              </div>
            </div>
            <div>
              <div className="text-[#7FFFD4] font-bold">up to ${vault.prize.toLocaleString()}</div>
              <div className="text-sm text-white">
                + {vault.apr}% APR in{" "}
                {vault.aprTokens.map((token, i) => (
                  <span key={token}>
                    {i > 0 && " and "}
                    {token}
                  </span>
                ))}
              </div>
            </div>
            <div className="w-24">
              <div className="h-2 bg-[#3D2B5E] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#7FFFD4]"
                  style={{ width: `${vault.winChance}%` }}
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold text-white">${vault.totalDeposits}</div>
                <div className="text-sm text-gray-400">{vault.totalTokens}</div>
              </div>
              <Button className="bg-[#7FFFD4] hover:bg-[#6EEEC3] text-black rounded-full">
                Deposit
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>

    {/* Mobile Vaults Cards */}
    <div className="md:hidden space-y-4">
      {vaults.map((vault) => (
        <Card key={vault.id} className="bg-[#2D1B4E] border-none p-4 rounded-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="relative w-10 h-10">
              {vault.icons.map((icon, i) => (
                <Image
                  key={i}
                  src={icon}
                  alt=""
                  width={40}
                  height={40}
                  className={`w-8 h-8 absolute ${i === 1 ? "top-1 left-1" : ""}`}
                />
              ))}
            </div>
            <div>
              <div className="font-semibold">{vault.name}</div>
              <div className="text-sm text-gray-400">{vault.protocol}</div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                Win Chance <Info className="w-4 h-4" />
              </div>
              <div className="w-24">
                <div className="h-2 bg-[#3D2B5E] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#7FFFD4]"
                    style={{ width: `${vault.winChance}%` }}
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                Prizes <Info className="w-4 h-4" />
              </div>
              <div className="text-[#7FFFD4] font-bold">up to ${vault.prize.toLocaleString()}</div>
              <div className="text-sm text-white">
                + {vault.apr}% APR in{" "}
                {vault.aprTokens.map((token, i) => (
                  <span key={token}>
                    {i > 0 && " and "}
                    {token}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-1">Total Deposits</div>
              <div className="font-bold text-white">${vault.totalDeposits}</div>
              <div className="text-sm text-gray-400 ">{vault.totalTokens}</div>
            </div>

            <Button className="w-full bg-[#7FFFD4] hover:bg-[#6EEEC3] text-black rounded-full">
              Deposit
            </Button>
          </div>
        </Card>
      ))}
    </div>
  </main>
  </div>
  )
}
