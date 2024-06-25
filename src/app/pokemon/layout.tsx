import Image from "next/image"

const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <>
    <div className="text-white flex flex-col items-center justify-center gap-5 pt-3">
      <div className="flex items-center justify-center gap-3">
      <h1 className="text-center text-2xl font-bold">PokéWonk</h1>
      <Image src="/logo.svg" alt="logo" width={30} height={30}></Image>
      </div>
    </div>
    {children}
    </>
  )
}
export default layout