"use client"

import { useProgress } from "@/Providers/progressProvider"
import LoadingBar from "react-top-loading-bar"

const LoadingBarComponent = () => {
  const {progress} = useProgress()
  return (
    <LoadingBar progress={progress} color="red" height={3}/>
  )
}
export default LoadingBarComponent