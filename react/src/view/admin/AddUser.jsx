import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

function AddUser() {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const addressRef = useRef();
    const birthdateRef = useRef();
    const statusRef = useRef();

    const navigate = useNavigate();
    const [error, setError] = useState([]);
    const [picture, setPicture] = useState([]);

    const handleImage = (e) => {
        setPicture({ image: e.target.files[0] });
    };
   useEffect(() => {
       console.log(picture);
   }, [picture]);
    const onSubmit = (e) => {
        e.preventDefault();
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            address: addressRef.current.value,
            birthdate: birthdateRef.current.value,
            status: statusRef.current.value,
            
        };
        const formData = new FormData();
        formData.append('image', picture.image);
        formData.append("name", payload.name);
        formData.append("dob", payload.birthdate);
        formData.append("status", payload.status);
        formData.append("address", payload.address);
        formData.append("password", payload.password);
        formData.append("email", payload.email);
        console.log(Object.fromEntries(formData));

        axios
            .post("/api/create-user", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => {
                if (res.data.status === 200) {
                    swal("Success", res.data.message, "success");
                    navigate('/view-user');
                } else {
                    setError(res.data.error);
                }
            });
    };
    return (
        <div className="create-user">
            <div className="admin-user-form">
                <form onSubmit={onSubmit}>
                    <h1 className="admin-formtitle">Create new User</h1>
                    <Link to='/view-user'>
                        View Users
                    </Link>

                    <span className="error">{error.image}</span>
                    <input
                        name="image"
                        id="pofile_pic"
                        type="file"
                        onChange={handleImage}
                    />
                    <span className="error">{error.name}</span>
                    <input ref={nameRef} type="name" placeholder="Full Name" />
                    <span className="error">{error.email}</span>
                    <input ref={emailRef} type="email" placeholder="Email" />
                    <span className="error">{error.password}</span>
                    <input
                        ref={passwordRef}
                        type="password"
                        placeholder="Password"
                    />
                    <span className="error">{error.address}</span>
                    <input ref={addressRef} type="text" placeholder="Address" />
                    <span className="error">{error.dob}</span>
                    <input
                        ref={birthdateRef}
                        type="date"
                        placeholder="Birthdate"
                    />
                    <span className="error">{error.status}</span>
                    <input ref={statusRef} type="text" placeholder="Status" />
                    <button className="btn btn-block">Create</button>
                </form>
            </div>
        </div>
    );
}
export default AddUser;
