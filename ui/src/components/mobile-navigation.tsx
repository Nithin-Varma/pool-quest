'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileNavigation() {
    const pathname = usePathname();
    const getLinkClass = (path: string) =>
      pathname === path ? "text-[#7FFFD4]" : "text-white";
  return (
   <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#2D1B4E] border-t border-[#3D2B5E] p-4">
   <div className="flex justify-around items-center">
   <Link href="/" className={getLinkClass("/")}>
         Home
       </Link>
       <Link href="/prizes" className={getLinkClass("/prizes")}>
         Prizes
       </Link>
       <Link href="/vaults" className={getLinkClass("/vaults")}>
         Vaults
       </Link>
       <Link href="/account" className={getLinkClass("/account")}>
         Account
       </Link>
   </div>
 </nav>
  )
}
