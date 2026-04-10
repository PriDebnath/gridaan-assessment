import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router'

const component = lazyRouteComponent(() => {
    return import('@/feature/flow/component/sign-up').then(mod => ({ default: mod.default }))
})

export const Route = createFileRoute('/auth/sign-up')({
    component: component
})

