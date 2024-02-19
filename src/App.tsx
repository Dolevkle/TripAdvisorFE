import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'

// Import the generated route tree
import { routeTree } from './routeTree.gen'
import { NextUIProvider } from '@nextui-org/react'
import { GoogleOAuthProvider } from '@react-oauth/google'

// Create a new router instance
const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Render the app
const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <NextUIProvider>
    <GoogleOAuthProvider clientId="385853328082-uvnh7ohdpdsoj7lk9c4e3jetkb1s8mim.apps.googleusercontent.com">
      <StrictMode>
      <RouterProvider router={router} />
      </StrictMode>
    </GoogleOAuthProvider>
    </NextUIProvider>
  )
}