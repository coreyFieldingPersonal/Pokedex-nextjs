export default async function gqlFetch({ query }: { query: string }) {
  const response = await fetch("https://beta.pokeapi.co/graphql/v1beta", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query,
    }),
  })

  const { data } = await response.json()
  return data
}
