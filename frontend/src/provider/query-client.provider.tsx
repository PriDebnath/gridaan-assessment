
//@Link: https://tanstack.com/query/latest/docs/framework/react/quick-start
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60 * 5, // 5 min cache
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
})

export function TanstackQueryClientProvider(props: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient} >
      {props.children}
    </QueryClientProvider>
  )
}

