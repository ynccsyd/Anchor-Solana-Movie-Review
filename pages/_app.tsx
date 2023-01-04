import "../styles/globals.css"
import type { AppProps } from "next/app"
import { ChakraProvider } from "@chakra-ui/react"
import WalletContextProvider from "../context/WalletContextProvider"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WalletContextProvider>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </WalletContextProvider>
  )
}

export default MyApp
