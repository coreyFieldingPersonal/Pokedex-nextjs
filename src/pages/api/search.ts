import { NextRequest, NextResponse } from "next/server"
import { queryWithParams } from "@/lib/graphql/gqlFetch"
import mapResults from "@/lib/helpers/mapResults"

export default async function handler(
  req: NextRequest,
  res?: any
): Promise<any> {
  const { searchParams } = new URL(req.url)
  const name = searchParams.get("name")

  const data = await queryWithParams({
    variables: `where: {name: {_eq: ${name}}}`,
  })
  const results = data["pokemon_v2_pokemon"]

  const items = mapResults(results)

  NextResponse.json({ items }, { status: 200 })
}
