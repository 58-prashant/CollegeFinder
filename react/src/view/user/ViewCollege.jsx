import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import '../../assets/css/college.css'

function ViewCollege(){
    const [data,setData] = useState({});
     const { id } = useParams();
     useEffect(()=>{
        axios.get("/api/view-college/"+id).then((res)=>{
            if(res.data.status === 200){
                setData(res.data.college);
                console.log(data);
            }
            else if (res.data.status === 404){
                console.log(res.data.message);
            }
        })
     },[])
return (
    <div className="college-info-card">
        <div>
            <h1>{data.name}</h1>
        </div>
        <div>
            <p>{data.location}</p>
            <p>{data.established_year}</p>
            <p>{data.number}</p>
            <p>{data.email}</p>
            <p>{data.description
            }</p>
        </div>
    </div>
);
}
export default ViewCollege;