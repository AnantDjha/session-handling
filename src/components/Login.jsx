import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import axios from "axios"



export default function Login()
{
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        setError,
        formState :{errors,isSubmitting,isSubmitted}
    } = useForm()

    const [resultData,setResultData] = useState()
    const onSubmit = async (data) => {
        try {
            let response = await axios.post("http://localhost:5000/login", data, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
    
            let result = response.data;    
            setResultData(result);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(()=>{
        if(resultData && resultData.message == "succesfull")
            {
                navigate("/")
            }
    },[resultData])
  

    return (
       

        <div className="mainLogin"  style={{ display: "flex", width: "100vw", height: "100vh", alignItems: "center", justifyContent: "center" }}>
            <div className="container-fluid w-50 h-50 bg-info rounded-4 d-flex align-items-center justify-content-center flex-column">
            {resultData && <div className="alert alert-success w-50" style={{fontSize:"13px"}}>
                        <strong>{resultData.message}</strong>
                    </div>}
            <form action="" onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column justify-content-center h-50 w-50 align-items-center ">
                
                <div className="nameField w-100 h-25" >
                    <input type="email" {...register("email",{
                        required:{value:true, message:"field is required"}
                    })}  className="w-100 h-75" style={{fontSize:"18px"}} placeholder="Enter your Email"/>
                </div>
                <div className="nameField w-100 h-25">
                    <input type="password" {...register("password",{
                        required:{value:true, message:"field is required"}
                    })} className="w-100 h-75" style={{fontSize:"18px"}} placeholder="Enter your password"/>
                </div>
                <input type="submit" value="Submit" className="btn btn-lg btn-warning mt-3"  style={{outline:"none", border:"none"}}/>
            </form>
            </div>
        </div>
    )
}