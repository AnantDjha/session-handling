import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const [data, setData] = useState([]);
    const navigate = useNavigate()

   

    useEffect(() => {
        axios.get("http://localhost:5000/user")
        .then(response => {
            // console.log(response.data);
            if(!response.data.valid)
                {
                    navigate("/login")
                }
            data.push(response.data);
        })
        .catch(error => console.log(error));
    }, []);

    return (
        <div>
            {data.length > 0 && data[0].valid && <p>{data[0].user}</p>}
        </div>
    );
}
