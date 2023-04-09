import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState([]);
    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();
        
       const payload = {
           email: emailRef.current.value,
           password: passwordRef.current.value,
       };

        axios.get("/sanctum/csrf-cookie").then((response) => {
            axios.post("/api/login", payload).then((res) => {
                 if(res.data.status === 200)
                {
                    
                    navigate("/otp-verification",{state:{
                        token: res.data.token,
                        user: res.data.username,
                        }});
                    
                }else if (res.data.status === 401) {
                    swal("Warning", res.data.message,"warning");
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
                    <h1 className="title">Login Page</h1>

                    <span className="error">{error.email}</span>
                    <input ref={emailRef} type="email" placeholder="Email" />
                    <span className="error">{error.password}</span>
                    <input ref={passwordRef} type="password" placeholder="Password" />
                    <Link className="forget" to="/">
                        Forget password?
                    </Link>
                    <button className="btn btn-block">Login</button>
                    <p className="message">
                        Not Registered?{" "}
                        <Link to="/register">Create an account</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
export default Login;
