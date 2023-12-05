import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Game } from './components/game'
import { ErrorBoundary } from './components/error-boundary'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Game />,
    errorElement: <ErrorBoundary />,
  },
])

function App() {
  return (
    <main>
      <RouterProvider router={router} />
    </main>
  )
}

export default App
