
//@Link: https://tanstack.com/query/latest/docs/framework/react/quick-start
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient()

export function TanstackQueryClientProvider(props: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient} >
      {props.children}
    </QueryClientProvider>
  )
}

