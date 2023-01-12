import React from 'react'
import { useRouteError } from 'react-router-dom'

export default function ErrorPage() {

    const error = useRouteError();
  return (
    <div id='error-page'>
        <h1>Oops</h1>
        <p>Error {error.statusText || error.message}</p>
    </div>
  )
}
