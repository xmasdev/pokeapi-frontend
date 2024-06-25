"use client"

import { useQuery } from "@tanstack/react-query"
import { fetchAbility } from "@/utils/fetchFunction"
import { titleCase } from "@/utils/stringFunctions"

const AbilityDetail = ({abilityName}: {abilityName: string}) => {
  const {data, isLoading, isError} = useQuery({
    queryKey: ['ability', abilityName],
    queryFn: () => fetchAbility(abilityName),
    retry: false,
  })

  if (isLoading){
    return <h3 className="text-xl text-gray-200 font-sans font-bold">Loading...</h3>
  }

  if (isError){
    return (
      <h3 className="text-xl text-gray-200 font-sans font-bold">Error Fetching Ability</h3>
    )
  }

  return (
    <>
    {!isLoading && !isError && (
      <div>
        <h3 className="text-xl text-gray-200 font-sans font-bold">{titleCase(abilityName)}</h3>
        <p className="text-lg text-gray-300 pl-3">{data.effect_entries.find((entry: any) => entry.language.name === "en").short_effect}</p>
      </div>
    )}
    </>
  )
}
export default AbilityDetail