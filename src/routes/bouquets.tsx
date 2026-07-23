import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/bouquets')({
  beforeLoad: () => {
    throw redirect({
      to: '/catalogue',
      replace: true,
    })
  },
})

