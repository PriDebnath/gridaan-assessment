import { useAuthStore } from '@/store/auth.store'
import { createFileRoute, lazyRouteComponent, useNavigate } from '@tanstack/react-router'

function rootComponent() {
  const navigate = useNavigate()
  const { token } = useAuthStore()
  if (!token) {
    navigate({ to: "/auth/sign-in" })
  }

  return (
    <>
      root 
    </>
  )
}

export const Route = createFileRoute('/')({
  component: rootComponent,
})


