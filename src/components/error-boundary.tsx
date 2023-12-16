// import { useRouteError } from 'react-router-dom'

export function ErrorBoundary() {
  // const error = useRouteError()
  const error = new Error()
  console.error(error)
  const yoinkifiedErrorMassage = JSON.stringify(
    error && typeof error === 'object' && 'message' in error
      ? error.message
      : '',
  )
  return (
    <article className="error-container">
      <p>Zoinked!</p>
      <p>{yoinkifiedErrorMassage}</p>
    </article>
  )
}
