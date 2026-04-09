import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router'

const component = lazyRouteComponent(() => {
    return import('@/page/auth/auth-login.page').then(mod => ({ default: mod.default }))
})

export const Route = createFileRoute('/auth/login')({
    component: component
})

