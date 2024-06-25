export function extractEvolutionChain(data: any): string[]{
  const evolutionChain = []
  if (data.chain){
    data = data.chain
  }
  if (!data.evolves_to.length){
    return [data.species.name]
  }
  if (data.species){
    evolutionChain.push(data.species.name)
  }
  return [...evolutionChain, ...extractEvolutionChain(data.evolves_to[0])]
}