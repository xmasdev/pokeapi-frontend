"use client"
import {useQuery, QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { fetchPokemon } from '@/utils/fetchFunction'
import { titleCase } from '@/utils/stringFunctions'

const client = new QueryClient()

const Card = ({pokemonName}: {pokemonName: string}) => {
  return (
    <QueryClientProvider client={client}>
      <CardInside pokemonName={pokemonName}></CardInside>
    </QueryClientProvider>
  )
}

const CardInside = ({pokemonName}: {pokemonName: string}) => {

  const {data, isLoading, isError} = useQuery({
    queryKey: ['pokemon', pokemonName],
    queryFn: () => fetchPokemon(pokemonName)
  })

  const [imageURL, setImageURL] = useState<string>('/pokeball-spinning.gif')
  const [types, setTypes] = useState<null | string[]>(null)
  const [dexNum, setDexNum] = useState<Number | string>("_")
  useEffect(()=>{
    if(data && !isLoading && !isError){
      setImageURL(data.sprites.other["official-artwork"].front_default || "/not-found.png")
      setDexNum(data.id)
      setTypes(data.types.map((slot: {type: {name: string}})=>slot.type.name))
    }
  }, [isLoading, data])

  return (
    <Link href={`/pokemon/${pokemonName}`} className="flex flex-col items-center justify-center sm:gap-1 lg:gap-2 rounded-md bg-white lg:h-48 lg:w-48 hover:cursor-pointer hover:scale-110 hover:shadow-lg duration-100 hover:animate-pulse h-48 w-40">
      <Image id={pokemonName} src={imageURL} alt='pokemon' width={100} height={100} objectFit="cover"/>
      <div className="flex flex-col items-center justify-center">
        <p className="text-gray-800">{titleCase(pokemonName)}</p>
        <p className="text-gray-800">#{dexNum as string}</p>
        <div className="flex gap-1">
          {types && types.map((type)=><p key={`${type}-${pokemonName}`} className="text-gray-800 text-sm bg-gray-300 rounded-md px-1">{type}</p>)}
        </div>
        </div>
    </Link>
  )
}
export default Card;