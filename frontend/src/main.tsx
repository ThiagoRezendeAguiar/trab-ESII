import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import theme from './theme.ts';
import './index.css'
import App from './App.jsx'
import { ChakraProvider } from '@chakra-ui/react';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </StrictMode>,
)
