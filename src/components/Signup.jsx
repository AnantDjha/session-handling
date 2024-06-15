import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import 'bootstrap/dist/css/bootstrap.min.css';





export default function Signup() {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting, isSubmitted },
        reset
    } = useForm()

    const [resMsg, setresMsg] = useState();

    useEffect(() => {
        if (resMsg && resMsg.message == "succesfull") {
            reset()
        }

    }, [resMsg])

    const onSubmit = async (data) => {
        try {
            let response = await fetch("http://localhost:5000/signup", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(data) })
            let resData = await response.json();
            setresMsg(resData)
        }
        catch (e) {
            console.log(e);
        }
    }
    return (
        <div className="SignUpMain container bg-succes" style={{ display: "flex", width: "100vw", height: "100vh", alignItems: "center", justifyContent: "center" }}>
            <div className="container-fluid w-50 h-50 bg-info rounded-4 d-flex align-items-center justify-content-center flex-column" >
            {resMsg && <div className="alert alert-success w-75" style={{fontSize:"13px"}}>
                        <strong>{resMsg.message}</strong>
                    </div>}
                <form action="" onSubmit={handleSubmit(onSubmit)}  className="d-flex flex-column justify-content-center h-50 w-75 align-items-center ">
                    
                    <div className="nameField w-100 h-25">
                        <input type="text" placeholder="Enter your Name" 
                            {...register("name", {
                                required: { value: true, message: "Name cannot be empty" },
                                pattern: {
                                    value: /^[A-Za-z]+$/i,
                                    message: 'Enter valid Name'
                                }
                            })}  className="w-100 h-75" style={{fontSize:"18px"}}
                        />
                        {(errors.name && isSubmitted) && <p className="text-danger">{errors.name.message}</p>}
                    </div>

                    <div  className="mt-3 mb-3 w-100 h-25">
                        <input type="email" placeholder="Enter your Email" 
                            {...register("email", {
                                required: { value: true, message: "Name cannot be empty" },

                            })} className="w-100 h-75" style={{fontSize:"18px"}}
                        />
                        {(errors.email && isSubmitted) && <p className="text-danger">{errors.email.message}</p>}
                    </div>

                    <div className="password w-100 h-25">
                        <input type="password" placeholder="Enter your password" 
                            {...register("pass", {
                                required: { value: true, message: "Name cannot be empty" },
                                min: { value: 8, message: "Minimum length should be 8" }

                            })} className="w-100 h-75" style={{fontSize:"18px"}}
                        />
                        {(errors.pass && isSubmitted) && <p className="text-danger ">{errors.pass.message}</p>}
                    </div>



                    <input type="submit" value="submit" className="btn btn-lg btn-warning mt-3"  style={{outline:"none", border:"none"}}/>
                </form>
            </div>
        </div>
    )
}