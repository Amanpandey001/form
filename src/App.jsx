import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home'
import Final from './components/Final'

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <><Home /></>
    },
    {
      path: "/final",
      element: <><Final /></>
    }
  ])
  return (
    <>


      <RouterProvider router={router} />
    </>
  )
}

export default App