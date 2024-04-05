import { useEffect, useState } from "react"

// Import Components.
import { Filters } from "@/components"
import LazyLoadGrid from "@/components/composite/LazyLoadGrid"

// Import Fonts.
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
  const [pokemonArray, setPokemonArray] = useState<any>([])
  const [initialResults, setInitialResults] = useState(pokemonArray)

  // Fetch initial results
  useEffect(() => {
    const getPokeData = async () => {
      if (!pokemonArray.length) {
        const results = await (await fetch("/api/pokemon")).json()
        setPokemonArray(results)
        setInitialResults(results)
      }
    }

    getPokeData()
  }, [])

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="max-w-7xl mx-auto 2xl:max-w-screen-2xl z-10 w-full items-center justify-between font-mono text-sm lg:flex flex-col">
        <Filters initialResults={initialResults} setResults={setPokemonArray} />
        <LazyLoadGrid results={pokemonArray} setResults={setPokemonArray} />
      </div>
    </main>
  )
}
