import AppRouter from "./router/AppRouter"
import { ChakraProvider } from "@chakra-ui/react"

function App() {

  return (
    <ChakraProvider>
      <AppRouter/>
    </ChakraProvider>
  )
}

export default App
