import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

function Register() {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const addressRef = useRef();

    const [error, setError] = useState([]);
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            address: addressRef.current.value,
        };
        console.log(payload);
        axios.get("/sanctum/csrf-cookie").then((response) => {
            axios.post("/api/register", payload).then((res) => {
                if (res.data.status === 200) {
                    navigate("/otp-verification", {
                        state: {
                            token: res.data.token,
                            user: res.data.username,
                            status: res.data.account,
                            email: res.data.email,
                        },
                    });
                } else {
                    setError(res.data.validation_errors);
                }
            });
        });
    };
    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <div className="intro-row">
                        <img className="form-logo" src="Logo.svg" alt="logo" />
                        <div className="intro-title">
                            <h1 className="title">Welcome To</h1>
                            <h1 className="sikshya">Sikhya Khoji</h1>
                        </div>
                    </div>
                    <h1 className=" title">Register Page</h1>

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
                    <button className="btn btn-block">Register</button>
                    <p className="message">
                        Already Registered? <Link to="/login">Sign In</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
export default Register;
