import "@/styles/globals.css"
import { TooltipProvider } from "@radix-ui/react-tooltip"
import type { AppProps } from "next/app"
import "../styles/globals.css"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <TooltipProvider>
      <Component {...pageProps} />
    </TooltipProvider>
  )
}
