import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home({user}) {
    const [time ,setTime] = useState(5)
   const navigate = useNavigate() 
useEffect(()=>{
    if(!user)
    {
        navigate("/login")
    }
    if(user.valid == false)
        {
        navigate("/login")

        }
},[user])

useEffect(()=>{
    const intervalId = setInterval(() => {
        setTime(a => a - 1);
      }, 1000);
    
      // Cleanup function to clear the interval
      return () => clearInterval(intervalId);
},[])
    return (
        <div>
           {user && user.valid ? <h1>Wellcome , {user.user}</h1> : <p>no data is availble</p>}
           <h2>Your session will expire in {time}</h2>
        </div>
    );
}
