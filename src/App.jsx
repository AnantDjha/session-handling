import { useState,useEffect } from 'react'
import axios from 'axios'
import { useContext } from 'react'
import { UserContext } from './context'
import './App.css'
import { useForm } from 'react-hook-form'
import Signup from './components/Signup'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'




function App() {
  
  const {user, setUser} = useContext(UserContext);
  useEffect(()=>{
    axios.defaults.withCredentials = true;
    axios.get(`http://localhost:5000/user`)
   .then((response) => {
    setUser(response.data)
   })
  }, [user]);
  const router = createBrowserRouter([
    {path:"/signup", element:<Signup/>},
    {path:"/",element:<Home user={user}/>},
    {path:"/login", element:<Login setUser={setUser}/>}
  ])
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
