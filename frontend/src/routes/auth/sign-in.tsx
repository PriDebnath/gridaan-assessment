import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router'

const component = lazyRouteComponent(() => {
    return import('@/feature/auth/component/sign-in').then(mod => ({ default: mod.default }))
})

export const Route = createFileRoute('/auth/sign-in')({
    component: component
})

