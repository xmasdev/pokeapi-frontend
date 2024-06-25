"use client"
import { useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { fetchPokemon, fetchSpecies, fetchEvolutionChain } from "@/utils/fetchFunction"
import Image from "next/image"
import Card from "@/components/pokemon-card"
import { titleCase, editGenerationString, editSpriteString } from "@/utils/stringFunctions"
import AbilityDetail from "@/components/AbilityDetail"
import { useProgress } from "@/Providers/progressProvider"
import { extractEvolutionChain } from "@/utils/pokemonFunctions"
import React from "react"

const Page = ({params}: {params: {pokemonName: string}}) => {
  const pokemonName = params.pokemonName
  const [evolutionChain, setEvolutionChain] = useState<string[] | null>(null)
  const {setProgress} = useProgress()

  const {data, isLoading, isError} = useQuery({
    queryKey: ['pokemon', pokemonName],
    queryFn: () => fetchPokemon(pokemonName),
    retry: false,
  })

  const {data: speciesData, isLoading: isLoadingSpecies, isError: isErrorSpecies} = useQuery({
    queryKey: ['species', pokemonName],
    queryFn: () => fetchSpecies(data.species.name),
    retry: true,
    enabled: !!data
  })

  const {data: evolutionData, isLoading: isLoadingEvolution, isError: isErrorEvolution} = useQuery({
    queryKey: ['evolution', pokemonName],
    queryFn: () => fetchEvolutionChain(speciesData.evolution_chain.url),
    retry: true,
    enabled: !!speciesData
  })

  useEffect(()=>{
    if(evolutionData){
      setEvolutionChain(extractEvolutionChain(evolutionData))
    }
  }, [evolutionData])

  if (isLoading){
    setProgress(50)
    return (
      <div className="text-white flex flex-col justify-center items-center gap-5 mt-10">
        <Image src={"/loading.gif"} alt="loading" height={200} width={200}></Image>
      </div>
    )
  }
  if (isError){
    setProgress(100)
    return (
      <div className="text-white flex flex-col justify-center items-center gap-5 mt-10">
        <h1 className="text-3xl"> Error </h1>
        <h2 className="text-xl">Could not find {[pokemonName]}</h2>
      </div>
    )
  }

  setProgress(100)
  return (
    <div>
      <div className="flex justify-center gap-5 mt-7 lg:flex-nowrap flex-wrap">
      <div className="w-full justify-center items-center flex lg:hidden">
          <Image src={data.sprites.other["official-artwork"].front_default} alt="image" width={500} height={500} />
        </div>
        {/* Left part start */}
        <div className="w-full text-white flex flex-col gap-4 justify-start pl-3 pr-3 lg:pl-20">
          <h1 className="text-5xl mb-1">{titleCase(pokemonName)}</h1>
          {!isLoadingSpecies && !isErrorSpecies && (<p className="text-lg">
            {speciesData.flavor_text_entries.find((entry: any) => entry.language.name === "en").flavor_text}
          </p>)}

          <div className="flex items-end justify-start gap-5">
          <h2 className="text-xl text-gray-200 font-sans font-bold">Pokédex No.</h2>
          <p className="text-lg">{data.id}</p>
          </div>

          <hr />

          <div className="flex items-end justify-start gap-5">
          <h2 className="text-xl text-gray-200 font-sans font-bold">First Appeared</h2>
          <p className="text-lg">
            {!isLoadingSpecies && !isErrorSpecies && editGenerationString(speciesData.generation.name)}
          </p>
          </div>

          <hr />

          <div className="flex items-center justify-start gap-5">
            <h2 className="text-xl text-gray-200 font-sans font-bold">Type</h2>
            <ul className="text-lg">
              {data.types.map((type: any) => (
                <li className="pl-3" key={type.type.name}>
                  {titleCase(type.type.name)}
                </li>
              ))}
              </ul>
          </div>

          <hr />

          <div className="flex flex-col gap-1">
            <h2 className="text-xl text-gray-200 font-sans font-bold">Abilities</h2>
            <ul className="text-lg">
              {data.abilities.map((ability: any) => (
                <li className="pl-3" key={ability.ability.name}>
                  <AbilityDetail abilityName={ability.ability.name} />
                </li>
              ))}
            </ul>
            </div>  

            <hr />

            <div className="flex items-end justify-start gap-5">
          <h2 className="text-xl text-gray-200 font-sans font-bold">Height</h2>
          <p className="text-lg">
            {data.height / 10} m
          </p>
          </div>

          <hr />
            <div className="flex items-end justify-start gap-5">
          <h2 className="text-xl text-gray-200 font-sans font-bold">Weight</h2>
          <p className="text-lg">
            {data.weight / 10} kg
          </p>
          </div>

          <hr />

          <div className="flex items-end justify-start gap-5">
          <h2 className="text-xl text-gray-200 font-sans font-bold">Build</h2>
          <p className="text-lg">
            {!isLoadingSpecies && !isErrorSpecies && speciesData.shape && titleCase(speciesData.shape.name) || "Not Available"}
          </p>
          </div>

        </div>

        {/* Left part end */}
        <div className="w-full justify-center items-center hidden lg:flex">
          <Image src={data.sprites.other["official-artwork"].front_default} alt="image" width={500} height={500} />
        </div>
      </div>



      <div className="flex flex-col items-start justify-center gap-3 pl-10 mt-10">
            <h2 className="text-3xl text-white font-serif font-semibold text-center w-full mb-3">Evolution Chain</h2>
            <div className="flex justify-center gap-5 items-center text-white w-full flex-col lg:flex-row">
              {evolutionChain && evolutionChain.map((pokemon: string, index: number) => (
                <React.Fragment key={`evolution-${pokemon}`}>
                  <Card pokemonName={pokemon}/>
                  {index < evolutionChain.length - 1 && <span className="mx-2 text-5xl hidden lg:inline">→</span>}
                  {index < evolutionChain.length - 1 && <span className="mx-2 text-5xl lg:hidden">↓</span>}
                </React.Fragment>
              ))}
          </div>
      </div>

      <div className="flex flex-col items-start lg:pl-20 sm:pl-10 mt-5">
        <h2 className="text-3xl text-white font-sans font-semibold mb-5">Sprites</h2>
        <div className="grid grid-cols-2 place-items-center lg:grid-cols-4 gap-5 w-full">
          {Object.keys(data.sprites).map((key: string) => {
            if (data.sprites[key] && typeof data.sprites[key] === "string"){
              return (
                <div key={key} className="flex flex-col items-center justify-center bg-gray-200 rounded-md h-32 w-32 lg:h-48 lg:w-48">
                  <div className="w-20 h-20 lg:h-32 lg:w-32">
                  <Image src={data.sprites[key]} alt="sprite" width={130} height={130} />
                  </div>
                  <p className="text-base">{editSpriteString(key)}</p>
                </div>
              )
            }
            
          })}
          {Object.keys(data.sprites.versions["generation-v"]["black-white"].animated).map((key: string) => {
            if (data.sprites.versions["generation-v"]["black-white"].animated[key] && typeof data.sprites.versions["generation-v"]["black-white"].animated[key] === "string"){
              return (
                <div key={key} className="flex flex-col items-center justify-center bg-gray-200 rounded-md h-32 w-32 lg:h-48 lg:w-48 gap-4">
                  <div className="h-20 w-20">
                  <Image src={data.sprites.versions["generation-v"]["black-white"].animated[key]} alt="sprite" width={130} height={130}/>
                  </div>
                  <p className="text-base">{editSpriteString(key)}</p>
                </div>
              )
            }
            
          })}
        </div>
      </div>


    </div>
  )
}

export default Page