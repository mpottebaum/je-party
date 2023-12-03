import { expect, it, describe } from 'vitest'
import { render, screen } from '@testing-library/react'
import { WithLoader } from './with-loader'

describe('WithLoader', () => {
  it('should render children when not loading', () => {
    const mockChildren = 'children'
    const mockIsLoading = false
    render(<WithLoader isLoading={mockIsLoading}>{mockChildren}</WithLoader>)

    const renderedChildren = screen.queryByText(mockChildren)
    const spinner = screen.queryByRole('status')
    expect(renderedChildren).toBeTruthy()
    expect(spinner).toBeFalsy()
  })

  it('should render circle spinner when loading', () => {
    const mockChildren = 'children'
    const mockIsLoading = true
    render(<WithLoader isLoading={mockIsLoading}>{mockChildren}</WithLoader>)

    const renderedChildren = screen.queryByText(mockChildren)
    const spinner = screen.queryByRole('status')
    expect(renderedChildren).toBeFalsy()
    expect(spinner).toBeTruthy()
  })
})
