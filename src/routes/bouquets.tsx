import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/bouquets')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/bouquets"!</div>
}
