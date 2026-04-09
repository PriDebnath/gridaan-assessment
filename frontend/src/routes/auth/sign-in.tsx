import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router'

const component = lazyRouteComponent(() => {
    return import('@/page/auth/sign-in.page').then(mod => ({ default: mod.default }))
})

export const Route = createFileRoute('/auth/sign-in')({
    component: component
})

