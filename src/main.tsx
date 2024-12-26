import ReactDOM from 'react-dom/client'
import { Analytics } from "@vercel/analytics/react"

import App from './App.tsx'
import { ChakraProvider } from '@chakra-ui/react'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ChakraProvider>
    <App />
    <Analytics />
  </ChakraProvider>,
)
