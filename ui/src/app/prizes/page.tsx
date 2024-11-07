'use client'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronLeft, ChevronRight} from "lucide-react"
import Image from "next/image"
import React from "react"
import { useState } from "react"

const networks = [
  {
    name: "Ethereum",
    icon: "eth",
    prizes: [
      { amount: 2752, frequency: "Every 6 months" },
      { amount: 507, frequency: "Monthly" },
      { amount: 52, frequency: "17x Monthly" },
      { amount: 17, frequency: "6x Daily" },
    ],
  },
  {
    name: "Optimism",
    icon: "op",
    prizes: [
      { amount: 21063, frequency: "Every 6 months" },
      { amount: 3692, frequency: "Monthly" },
      { amount: 392, frequency: "17x Monthly" },
      { amount: 172, frequency: "6x Daily" },
    ],
  },
]

export default function Prize() {
    const [activeIndex, setActiveIndex] = useState(0)

    const nextSlide = () => {
      setActiveIndex((current) => (current + 1) % networks.length)
    }
  
    const prevSlide = () => {
      setActiveIndex((current) => (current - 1 + networks.length) % networks.length)
    }
  return (
    <div className="min-h-screen bg-[#1C0B3D] text-white">
    <div className=" mx-auto container  px-4 py-8">
        <div className="text-center mb-12">
          <Image
            src="/pool2gether.webp"
            alt="Celebration"
            width={80}
            height={80}
            className="mx-auto mb-6"
          />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Keep your deposit. Win up to{" "}
            <span className="text-[#7FFFD4] block md:inline">$270,876</span>
          </h1>
          <Button className="mt-6 bg-[#7FFFD4] hover:bg-[#6EEEC3] text-black rounded-full px-8 py-6 text-lg">
            Deposit to Win
          </Button>
        </div>

        <h2 className="text-[#7FFFD4] text-3xl font-bold text-center mb-8">Current Prizes</h2>

        <div className="relative max-w-3xl mx-auto">
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-[-3rem] top-1/2 -translate-y-1/2 z-10"
            onClick={prevSlide}
          >
            <ChevronLeft className="w-8 h-8" />
          </Button>

          <Card className="bg-[#2D1B4E] border-none p-6 rounded-2xl overflow-hidden">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Image
                src="/placeholder.svg"
                alt={networks[activeIndex].name}
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <span className="text-xl">{networks[activeIndex].name}</span>
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              <div className="text-gray-400">Prize</div>
              <div className="text-gray-400 text-right">Frequency</div>
              {networks[activeIndex].prizes.map((prize, index) => (
               <React.Fragment key={index}>
               <div className="text-[#7FFFD4] text-xl font-bold">
                 ${prize.amount.toLocaleString()}
               </div>
               <div className="text-right text-white">{prize.frequency}</div>
             </React.Fragment>
              ))}
            </div>
          </Card>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-[-3rem] top-1/2 -translate-y-1/2 z-10"
            onClick={nextSlide}
          >
            <ChevronRight className="w-8 h-8" />
          </Button>
        </div>
      </div>
</div>
  )
}
