import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { SetupWorker } from 'msw/browser'

async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return
  }
  // @ts-expect-error TODO: will fix
  const { worker } = (await import('./msw/browser.js')) as {
    worker: SetupWorker
  }
  return worker.start()
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
})
