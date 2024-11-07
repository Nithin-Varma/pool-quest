import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
// import Link from "next/link"

const networks = [
  {
    name: "Ethereum",
    icon: "/placeholder.svg",
    prize: 2752,
    weth: 0.98
  },
  {
    name: "Optimism",
    icon: "/placeholder.svg",
    prize: 21063,
    weth: 7.5
  },
  {
    name: "Base",
    icon: "/placeholder.svg",
    prize: 43748,
    weth: 15.61
  },
  {
    name: "Arbitrum",
    icon: "/placeholder.svg",
    prize: 189,
    weth: 0.07
  },
  {
    name: "Scroll",
    icon: "/placeholder.svg",
    prize: 1717,
    weth: 0.61
  },
  {
    name: "Gnosis",
    icon: "/placeholder.svg",
    prize: 1624,
    weth: 0.58
  }
]


export default function Account() {
  return (
    <div className="min-h-screen bg-[#1C0B3D] text-white"> <main className="container mx-auto px-4 py-8">
    <div className="text-center mb-12">
      <h1 className="text-4xl md:text-5xl font-bold mb-8">
        Connect your wallet to view account status
      </h1>
      <Button className="bg-[#7FFFD4] hover:bg-[#6EEEC3] text-black rounded-full px-8 py-6 text-lg">
        Connect Wallet <ArrowRight className="ml-2 w-5 h-5" />
      </Button>
    </div>

    <div className="grid md:grid-cols-3 gap-4">
      {networks.map((network) => (
        <Card
          key={network.name}
          className="bg-[#2D1B4E] border-none p-6 rounded-xl flex flex-col items-center"
        >
          <div className="bg-[#3D2B5E] px-4 py-2 rounded-full flex items-center gap-2 mb-4">
            <Image
              src={network.icon}
              alt={network.name}
              width={20}
              height={20}
              className="w-5 h-5"
            />
            <span>{network.name}</span>
          </div>
          <div className="text-xl mb-2 text-white">Grand Prize</div>
          <div className="text-[#7FFFD4] text-4xl md:text-5xl font-bold mb-2">
            ${network.prize.toLocaleString()}
          </div>
          <div className="text-gray-400">≈ {network.weth} WETH</div>
        </Card>
      ))}
    </div>
  </main></div>
  )
}
