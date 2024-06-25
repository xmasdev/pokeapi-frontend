import CardGrid from "@/components/card-grid";
import Image from "next/image";

export default function Home() {

  return (
    <>
    <div className="text-white flex flex-col items-center justify-center gap-5 pt-3">
      <div className="flex items-center justify-center gap-3">
      <h1 className="text-center text-2xl font-bold">PokéWonk</h1>
      <Image src="/logo.svg" alt="logo" width={30} height={30}></Image>
      </div>
      <p className="text-center text-xl">A pokédex built using the pokéAPI</p>
    </div>
    <CardGrid></CardGrid>
    </>
  );
}
