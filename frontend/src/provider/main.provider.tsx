import  { TanstackQueryClientProvider } from "./query-client.provider"
import { TanstackRouterProvider } from "./tanstack-router.provider"

export const MainProvider  = () => {
  return (
    <TanstackQueryClientProvider>
      <TanstackRouterProvider />
    </TanstackQueryClientProvider>
  )
}