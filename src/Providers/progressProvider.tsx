"use client"
import { useState, useContext, createContext } from "react"

type progressContextType = {
  progress: number
  setProgress: (progress: number) => void
}

const progressContext = createContext({} as progressContextType)

export const ProgressProvider = ({children}: {children: React.ReactNode}) => {
  const [progress, setProgress] = useState(0)

  return (
    <progressContext.Provider value={{progress, setProgress}}>
      {children}
    </progressContext.Provider>
  )
}

export const useProgress = () => {
  return useContext(progressContext)
}