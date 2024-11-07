import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"
// import Link from "next/link"

export default function Component() {
  return (
    <div className="min-h-screen bg-[#1C0B3D] text-white">
   <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 flex flex-wrap items-center justify-center gap-2 text-center">
  Deposit
  <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
      height="1em"
      width="1em"
  
    >
      <path d="M22 12 A10 10 0 0 1 12 22 A10 10 0 0 1 2 12 A10 10 0 0 1 22 12 z" />
      <path d="M16 8h-6a2 2 0 100 4h4a2 2 0 110 4H8M12 18V6" />
    </svg>


  to win up to
  <span className="text-[#7FFFD4] text-3xl md:text-4xl lg:text-5xl">$270,876</span>
</h1>

          <p className="text-lg text-gray-300">You can withdraw your full deposit at any time</p>
          <Button className="mt-6 bg-[#7FFFD4] hover:bg-[#6EEEC3] text-black rounded-full px-8 py-6 text-lg">
            Deposit to Win
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {[
            { network: "Ethereum", amount: "2,752", weth: "0.98" },
            { network: "Optimism", amount: "21,063", weth: "7.5" },
            { network: "Base", amount: "43,748", weth: "15.61" },
            { network: "Arbitrum", amount: "189", weth: "0.07" },
            { network: "Scroll", amount: "1,717", weth: "0.61" },
            { network: "Gnosis", amount: "1,624", weth: "0.58" },
          ].map((prize, index) => (
            <Card
              key={index}
              className="bg-[#2D1B4E] border-none p-6 rounded-2xl flex flex-col items-center"
            >
              <div className="bg-[#3D2B5E] px-4 py-2 rounded-full flex items-center gap-2 mb-4">
                <Image
                  src="/placeholder.svg"
                  alt={prize.network}
                  width={20}
                  height={20}
                  className="w-5 h-5"
                />
                <span>{prize.network}</span>
              </div>
              <div className="text-xl mb-2">Grand Prize</div>
              <div className="text-[#7FFFD4] text-4xl md:text-5xl font-bold mb-2">
                ${prize.amount}
              </div>
              <div className="text-gray-400">≈ {prize.weth} WETH</div>
            </Card>
          ))}
        </div>
      </main>

      {/* Mobile Navigation */}
      {/* <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#2D1B4E] border-t border-[#3D2B5E] p-4">
        <div className="flex justify-around items-center">
          <Link href="/" className="text-[#7FFFD4]">
            Home
          </Link>
          <Link href="/prizes">Prizes</Link>
          <Link href="/vaults">Vaults</Link>
          <Link href="/account">Account</Link>
        </div>
      </nav> */}
    </div>
  )
}