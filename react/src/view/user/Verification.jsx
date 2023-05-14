import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import swal from "sweetalert";

 function Verification() {
    const location = useLocation();
    const [otp, setOtp] = useState([]);
    const [code, setCode] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get("/api/verification").then((res) => {
            setCode(res.data.code);
        });
    }, []);

    // console.log("Verification component rendered");
    function onSubmit(e) {
        e.preventDefault();
        const enteredOtp = [otp].join(""); // convert otp array to string
        const enteredCode = [code].join("");
        console.log(otp);
        console.log(code);
        if (enteredOtp === enteredCode) {
            localStorage.setItem("auth_token", location.state.token);
            localStorage.setItem("auth_user", location.state.user);
            localStorage.setItem("ac_type", location.state.status);
            localStorage.setItem("email", location.state.email);
            localStorage.setItem("id",location.state.id);
            swal("Success", "OTP Matched", "success");
            navigate("/");
        } else {
            alert("OTP does not matched");
        }
    }
    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <div className="intro-row">
                        <img className="form-logo" src="Logo.svg" alt="logo" />
                    </div>
                    <h4>Please enter the displayed number</h4>
                    <span className="otp">{code}</span>
                    <h1 className=" title">OTP Verification</h1>
                    <input
                        onChange={(e) => setOtp(e.target.value)}
                        type="text"
                        placeholder="Enter your OTP"
                    />
                    <button className="btn btn-block">Verify</button>
                </form>
            </div>
        </div>
    );
}
export default Verification
