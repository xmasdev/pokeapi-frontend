export const fetchPokemon = async (name: string) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`)
  if (response.status != 200){
    throw new Error('Pokemon not found')
  }
  const data = await response.json()
  return data
 }


export const fetchSpecies = async (species: string) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${species}`)
  if (response.status != 200){
    throw new Error('Species not found')
  }
  const data = await response.json()
  return data
}

export const fetchAbility = async(ability: string) => {
  const response = await fetch(`https://pokeapi.co/api/v2/ability/${ability}`)
  if (response.status != 200){
    throw new Error('Ability not found')
  }
  const data = await response.json()
  return data
}

export const fetchEvolutionChain = async (url: string) => {
  const response = await fetch(url)
  if (response.status != 200){
    throw new Error('Evolution chain not found')
  }
  const data = await response.json()
  return data
}