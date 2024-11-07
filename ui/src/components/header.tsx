'use client'
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const getLinkClass = (path: string) =>
    pathname === path ? "text-[#7FFFD4]" : "hover:text-[#7FFFD4] text-white"; // Apply the active color or default styling

  return (
    <>
      {/* Desktop Header */}
      <header className="hidden md:flex items-center justify-between px-6 py-4 bg-[#1C0B3D] text-white">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/pool2gether.webp" alt="Cabana" width={40} height={40} className="w-10 h-10" />
          <span className="text-2xl font-bold">Pool Quest</span>
        </Link>
        <nav className="flex items-center gap-8">
          <Link href="/prizes" className={getLinkClass("/prizes")}>
            Prizes
          </Link>
          <Link href="/vaults" className={getLinkClass("/vaults")}>
            Vaults
          </Link>
          <Link href="/account" className={getLinkClass("/account")}>
            Account
          </Link>
          <Button className="bg-[#8257E6] hover:bg-[#9466FF] text-white rounded-full px-6">
            Connect Wallet
          </Button>
        </nav>
      </header>
      
      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between p-4 bg-[#1C0B3D] text-white">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/pool2gether.webp" alt="Cabana" width={40} height={40} className="w-10 h-10" />
          <span className="text-2xl font-bold">Pool Quest</span>
        </Link>
        <div className="flex items-center gap-4">
          <Button className="bg-[#8257E6] hover:bg-[#9466FF] text-white rounded-full">
            Connect Wallet
          </Button>
        </div>
      </header>
    </>
  );
}
