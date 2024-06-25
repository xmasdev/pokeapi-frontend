"use client"
import { useState } from "react"
import Card from "./pokemon-card"
import useInfiniteScroll from "react-infinite-scroll-hook"
import { useProgress } from "@/Providers/progressProvider"

const CardGrid = () => {
  const [pokemonList, setPokemonList] = useState<any[]>([])
  const [offset, setOffset] = useState(0)
  const [hasNextPage, setHasNextPage] = useState(true)
  const {setProgress} = useProgress()

  const fetchPokemonList = async (limit=30) => {
    setProgress(10)
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
    const data = await response.json()
    setProgress(70)
    setPokemonList(prev => [...prev, ...data.results])
    setOffset(prev => prev + limit)
    if (data.next == "null") {
      setHasNextPage(false)
    }
    setProgress(100)
  }

  const [infiniteRef] = useInfiniteScroll({
    loading: false,
    hasNextPage: hasNextPage,
    onLoadMore: fetchPokemonList,
    
  })


  return (
    <div className="flex flex-wrap justify-around items-center gap-y-2 gap-x-1 mt-5 px-2">
      {pokemonList.map((pokemon) => (
        <Card key={pokemon.name} pokemonName={pokemon.name} />
      ))}
      <div ref={infiniteRef} className="w-full h-10 flex justify-center items-center">
        
      </div>
  </div>
  )
}
export default CardGrid
