import { useState } from 'react'

import './App.css'
import { useForm } from 'react-hook-form'
import Signup from './components/Signup'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'


const router = createBrowserRouter([
  {path:"/signup", element:<Signup/>},
  {path:"/",element:<Home/>},
  {path:"/login", element:<Login/>}
])

function App() {
  

 
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
