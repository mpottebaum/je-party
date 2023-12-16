import { expect, it, describe, vi, beforeEach, MockInstance } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ErrorBoundary } from './error-boundary'
// import * as router from 'react-router-dom'

// vi.mock('react-router-dom', async () => ({
//   __esModule: true,
//   ...(await vi.importActual('react-router-dom')),
// }))

describe('ErrorBoundary', () => {
  // let errorSpy: MockInstance<[], unknown>
  beforeEach(() => {
    // errorSpy = vi.spyOn(router, 'useRouteError').mockReturnValue(null)
  })

  it('should render', () => {
    const { baseElement } = render(<ErrorBoundary />)

    expect(baseElement).toBeTruthy()
  })

  it('should render error message if there is one', () => {
    const message = 'zoinks!'
    // errorSpy.mockReturnValue(new Error(message))
    render(<ErrorBoundary />)

    const renderedMessage = screen.getByText(JSON.stringify(message))
    expect(renderedMessage).toBeTruthy()
  })
})
