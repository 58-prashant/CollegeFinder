import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './editUser.css';
import swal from "sweetalert";

function EditUser(){
    const [data, setData] = useState({
        name: "",
        dob: "",
        location: "",
    });
    // const [inputData,setInputData]= useState({
    //     name:"",
    //     dob:"",
    //     location:"",
    // })
    const [error, setError] = useState([]);
    const [picture,setPicture] = useState([]);
    const {id} =useParams();
    const navigate = useNavigate();

    const handleData = (e) => {
        e.persist();
        setData({...data, [e.target.name]: e.target.value });
        console.log([e.target.name]);
        console.log(e.target.value);
        console.log(data);
    };
    const handleImage = (e)=>{
        setPicture({image: e.target.files[0]});
    }
    useEffect(()=>{
        axios.get("api/user-edit/" + id).then((res)=>{
            if(res.data.status === 200){
                setData(res.data.data);
            }else if(res.data.status === 404){
                swal("Error", res.data.message, "error");
                navigate("/user");
            }
        });
        
    },[])
     useEffect(() => {
         console.log(data);
     }, []);

     const updateUser = (e) =>{
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('image',picture.image);
        formData.append("name", data.name);
        formData.append("dob", data.dob);
        formData.append("address", data.address);
        console.log(Object.fromEntries(formData));
        axios.post("/api/update-user/"+id,formData, {headers: {
          "Content-Type": "multipart/form-data",
      }}).then((res)=>{
            if(res.data.status === 200){
                swal("Success",res.data.message,"success");
                setError([]);
                navigate("/user");
            }else if(res.data.status === 422){
                setError(res.data.error);
                swal("Error",error,"error");

            }else if(res.data.status === 404){
                swal("Error",res.data.message,"error");
                navigate('/user');
            }
        })

     }
    return (
        <div>
            <div key={data.id} className="user-card">
                <h1>Edit User</h1>
                <form encType="multipart/form-data" onSubmit={updateUser}>
                    <label htmlFor="profile_pic">Choose Profile:</label>
                    <input name="image" id="pofile_pic" type="file" onChange={handleImage} />
                    <img
                        style={{ width: 100 }}
                        src={"http://localhost:8000/" + data.profile_path}
                        // alt="profile picture"
                    />
                    <br />
                    <label htmlFor="name">Enter Name:</label>
                    <i className="error">{error.name}</i>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        onChange={handleData}
                        defaultValue={data.name}
                    />

                    <label htmlFor="dob">Choose Birthday:</label>
                    <i className="error">{error.dob}</i>
                    <input
                        id="dob"
                        name="dob"
                        type="date"
                        onChange={handleData}
                        defaultValue={data.dob}
                    />
                    <label htmlFor="location">Enter Location:</label>
                    <i className="error">{error.address}</i>
                    <input
                    name="address"
                        id="location"
                        type="text"
                        onChange={handleData}
                        defaultValue={data.address}
                    />
                    <button className="btn">Update</button>
                </form>
            </div>
        </div>
    );
}
export default EditUser;