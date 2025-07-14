import React from 'react'
import { createBrowserRouter, Form, RouterProvider } from 'react-router-dom'
import First from './pages/First'
import FormPart from './pages/FormPart'

const router = createBrowserRouter([
  {
    path: "/",
    element: <First />,
    children: [
      {
        index: true,
        element: <FormPart />
      }
    ]
  }
])
function App() {
  return <RouterProvider router={router} />
}

export default App