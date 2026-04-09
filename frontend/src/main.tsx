import './index.css'
import { StrictMode, type JSX } from 'react'
import { createRoot } from 'react-dom/client'
// import { Toaster } from "@/components/ui/sonner"

import { MainProvider } from '@/provider/main.provider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MainProvider />
    {/* <Toaster /> */}
  </StrictMode>,
)