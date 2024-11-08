'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Sparkles, Globe, Coins, Users } from 'lucide-react'
import { VerificationLevel, IDKitWidget, useIDKit } from "@worldcoin/idkit"
import type { ISuccessResult } from "@worldcoin/idkit"
import { verify } from "./actions/verify"
import WagmiConnectButton from '@/components/wallet-connect'

export default function LandingPage() {
  const [worldIdConnected, setWorldIdConnected] = useState(false)

  const app_id = process.env.NEXT_PUBLIC_WLD_APP_ID as `app_${string}`
  const action = process.env.NEXT_PUBLIC_WLD_ACTION

  // if (!app_id) {
  //   throw new Error("app_id is not set in environment variables!")
  // }
  // if (!action) {
  //   throw new Error("action is not set in environment variables!")
  // }

  const { setOpen } = useIDKit()

  const onSuccess = (result: ISuccessResult) => {
    setWorldIdConnected(true)
    window.alert(
      "Successfully verified with World ID! Your nullifier hash is: " +
        result.nullifier_hash
    )
  }

  const handleProof = async (result: ISuccessResult) => {
    console.log(
      "Proof received from IDKit, sending to backend:\n",
      JSON.stringify(result)
    )
    const data = await verify(result)
    if (data.success) {
      console.log("Successful response from backend:\n", JSON.stringify(data))
    } else {
      throw new Error(`Verification failed: ${data.detail}`)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center border-b border-gray-800">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
          AnyWin
        </h1>
        <WagmiConnectButton/>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="text-center mb-20">
          <h2 className="text-5xl font-extrabold mb-6 leading-tight">
            The World's First Egalitarian <br /> No-Loss Lottery
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-gray-400">
            Revolutionizing finance, empowering communities, and working towards a poverty-free world.
          </p>
          <div className="space-y-4">
            <IDKitWidget
              action={action}
              app_id={app_id}
              onSuccess={onSuccess}
              handleVerify={handleProof}
              verification_level={VerificationLevel.Orb}
            >
              {({ open }) => (
                <Button 
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105"
                  onClick={open}
                >
                  Verify with World ID
                </Button>
              )}
            </IDKitWidget>
            {worldIdConnected && (
              <div>
                <WagmiConnectButton/>
               
              </div>
            )}
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-12 mb-20">
          <div className="border border-gray-800 p-8 rounded-xl hover:border-blue-500 transition-colors duration-300">
            <Sparkles className="w-12 h-12 mb-4 text-blue-400" />
            <h3 className="text-2xl font-bold mb-4">Crypto & Liquid Staking</h3>
            <p className="text-gray-400">
              AnyWin leverages cutting-edge cryptocurrency and liquid staking technologies to create a sustainable, high-yield no-loss lottery system. Your assets work for you while giving you the chance to win big.
            </p>
          </div>
          <div className="border border-gray-800 p-8 rounded-xl hover:border-purple-500 transition-colors duration-300">
            <Globe className="w-12 h-12 mb-4 text-purple-400" />
            <h3 className="text-2xl font-bold mb-4">Ending Extreme Poverty</h3>
            <p className="text-gray-400">
              With enough users, AnyWin has the potential to generate significant returns. A portion of these returns will be dedicated to initiatives aimed at eradicating extreme poverty worldwide.
            </p>
          </div>
        </section>

        <section className="text-center mb-20">
          <h2 className="text-4xl font-bold mb-6">Powering Decentralized UBI</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-gray-400">
            AnyWin is pioneering the world's first decentralized Universal Basic Income program. By participating, you're not just playing to win – you're contributing to a more equitable future for all.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="border border-gray-800 p-8 rounded-xl hover:border-green-500 transition-colors duration-300">
              <Coins className="w-12 h-12 mb-4 text-green-400 mx-auto" />
              <h3 className="text-2xl font-bold mb-4">Sustainable Funding</h3>
              <p className="text-gray-400">
                Our innovative model ensures a consistent flow of funds to support UBI initiatives, creating a self-sustaining ecosystem of prosperity.
              </p>
            </div>
            <div className="border border-gray-800 p-8 rounded-xl hover:border-yellow-500 transition-colors duration-300">
              <Users className="w-12 h-12 mb-4 text-yellow-400 mx-auto" />
              <h3 className="text-2xl font-bold mb-4">Community-Driven</h3>
              <p className="text-gray-400">
                AnyWin's decentralized nature puts the power in the hands of the community, ensuring fair distribution and transparent governance.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="container mx-auto px-4 py-8 text-center border-t border-gray-800">
        <p className="text-gray-500">&copy; 2024 AnyWin. All rights reserved. Revolutionizing finance for a better world.</p>
      </footer>
    </div>
  )
}