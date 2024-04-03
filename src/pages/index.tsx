import { Inter } from "next/font/google"
import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import { Filters } from "@/components"
import ResultsGrid from "@/components/composite/ResultsGrid"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
  const [pokemonArray, setPokemonArray] = useState<any>([])

  // Fetch initial results
  useEffect(() => {
    const getPokeData = async () => {
      const data = await (await fetch("/api/pokemon")).json()
      setPokemonArray(data.results)
    }

    getPokeData()
  }, [])

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="max-w-7xl mx-auto 2xl:max-w-screen-2xl z-10 w-full items-center justify-between font-mono text-sm lg:flex flex-col">
        <Filters setResults={setPokemonArray} />
        <ResultsGrid results={pokemonArray} setResults={setPokemonArray} />
      </div>
    </main>
  )
}
