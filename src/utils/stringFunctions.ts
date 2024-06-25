export const titleCase = (str: string) => {
  return str.toLowerCase().split(' ').map(function(word) {
    return word.replace(word[0], word[0].toUpperCase());
  }).join(' ');
}

export const editGenerationString = (str: string) => {
  return titleCase(str.split("-")[0]) + " " + str.split("-")[1].toUpperCase()
}

export const editSpriteString = (str: string) => {
  return titleCase(str.split("_")[0]) + " " + titleCase(str.split("_")[1])
}