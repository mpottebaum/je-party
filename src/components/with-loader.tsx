import { ReactNode } from 'react';
import { Circles } from 'react-loader-spinner'

interface WithLoaderProps {
  children: ReactNode;
  isLoading: boolean;
}

export function WithLoader({ children, isLoading }: WithLoaderProps) {
  if(isLoading) {
    return (
      <Circles
        color="#00BFFF"
        height={80}
        width={80}
        ariaLabel="circles-loading"
      />
    )
  }
  return children
}
