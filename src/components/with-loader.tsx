import type { ReactNode } from 'react'

interface WithLoaderProps {
  children: ReactNode
  isLoading: boolean
}

export function WithLoader({ children, isLoading }: WithLoaderProps) {
  if (isLoading) {
    return <p role="status">Loading</p>
  }
  return children
}
