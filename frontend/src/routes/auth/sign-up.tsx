import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router'

const component = lazyRouteComponent(() => {
    return import('@/page/auth/sign-up.page').then(mod => ({ default: mod.default }))
})

export const Route = createFileRoute('/auth/sign-up')({
    component: component
})

