import { useEffect } from 'react'
import { useAuthStore } from '@/store/auth.store'
import Dashboard from '@/page/dashboard/dashboard.page'
import { createFileRoute, lazyRouteComponent, useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { toastConfig } from '@/components/ui/sonner'

// const component = lazyRouteComponent(() => {
//     return import('@/page/dashboard/dashboard.page').then(mod => ({ default: mod.default }))
// })

function rootComponent() {
  const navigate = useNavigate()
  const { token } = useAuthStore()
  useEffect(() => {
    if (!token) {
      navigate({ to: "/auth/sign-in" })
    }
  }, [token, navigate])

  if (!token) {
    const message = "Please sign in to continue. Redirecting...";
    console.warn(message);
    toast.info(message,toastConfig);
    return null
  }
  return (
    <>
      <Dashboard />
    </>
  )
}

export const Route = createFileRoute('/')({
  component: rootComponent,
})


