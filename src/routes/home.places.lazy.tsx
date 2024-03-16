import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/home/places')({
  component: () => <div>Hello /home/places!</div>
})