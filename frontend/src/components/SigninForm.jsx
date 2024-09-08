import { Link, useNavigate } from "react-router-dom";
import "./SigninFormCss.css";
import { useState } from "react";
import axios from "axios";
export default function SigninForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()
    return (
        <form className="form">
            <p className="title">
                Register
                <span className="title-before"></span>
                <span className="title-after"></span>
            </p>
            <p className="message">Sign-in and Enjoy your meal.</p>

            <label className="form-label">
                <input required placeholder="email" type="email" className="inputbox" onChange={ e =>{
                    setEmail(e.target.value)
                }} />
                <span className="inputbox-span"></span>
            </label>

            <label className="form-label">
                <input required placeholder="Password" type="password" className="inputbox" onChange={e=>{
                    setPassword(e.target.value)
                }} />
                <span className="inputbox-span"></span>
            </label>
            <button className="submit" onClick={async(e) =>{
                    e.preventDefault();
                    const url = "http://localhost:3000/res/signin";
                    const data = {
                        email,
                        password
                    }
                    console.log(data)
                    try{
                        const response = await axios.post(url, data)
                        localStorage.setItem("token", response.data.token)
                        navigate("/landing")
                    }catch(e){
                        console.log(e,"error")
                    }
                    
            } } >Submit</button>
            <p className="signin">
                Don not have an account? <Link to="/signup" className="signin-link">Signup</Link>
            </p>
        </form>
    );
}
