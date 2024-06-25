"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

const Navbar = () => {
  const [search, setSearch] = useState<string>("")
  const router = useRouter()

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      router.push(`/pokemon/${search}`)
    }
  }

  return (
    <div className="flex justify-center items-center h-14 gap-x-3">
      <input type="text" placeholder="Search for pokemon" className="sm:w-1/2 lg:w-1/3 bg-white rounded-md text-lg px-2 py-1 text-black" value={search} onChange={(e)=>{setSearch(e.target.value)}} onKeyDown={handleKeyDown}/>
      <Image src={"/search_icon.svg"} alt="search" width={35} height={35} className="invert hover:cursor-pointer" onClick={()=>{
        router.push(`/pokemon/${search}`)
      }}/>
    </div>
  )
}
export default Navbar