import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function ViewCollege(){
     const { id } = useParams();
     useEffect(()=>{
        axios.get("/api/view-college/"+id).then((res)=>{
            
        })
     },[])
return (
   

    <div>

    </div>
);
}
export default ViewCollege;