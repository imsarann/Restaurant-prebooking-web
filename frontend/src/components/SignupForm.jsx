import { Link, useNavigate } from "react-router-dom";
import "./SignupFormCss.css";
import { useState } from "react";
import axios from "axios";

export default function SignupForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleOnSubmit = async (e) => {
    e.preventDefault(); 
    const data = {
      firstName,
      lastName,
      email,
      password,
    };
    const url = "http://localhost:3000/res/signup";
    console.log(data);
    try {
      const response = await axios.post(url, data);
      localStorage.setItem("token", response.data.token);
      navigate("/landing");
    } catch (err) {
      console.log(err, "error occurred");
    }
  };

  return (
    <form className="form" onSubmit={handleOnSubmit}>
      <p className="form-title">Register</p>
      <p className="form-message">Signup now and get full access to our app.</p>
      <div className="form-flex">
        <label className="form-label">
          <input
            required
            placeholder="Firstname"
            type="text"
            className="form-input"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <span className="form-span"></span>
        </label>

        <label className="form-label">
          <input
            required
            placeholder="Lastname"
            type="text"
            className="form-input"
            onChange={(e) => setLastName(e.target.value)}
          />
          <span className="form-span"></span>
        </label>
      </div>

      <label className="form-label">
        <input
          required
          placeholder="Email"
          type="email"
          className="form-input"
          onChange={(e) => setEmail(e.target.value)}
        />
        <span className="form-span"></span>
      </label>

      <label className="form-label">
        <input
          required
          placeholder="Password"
          type="password"
          className="form-input"
          onChange={(e) => setPassword(e.target.value)}
        />
        <span className="form-span"></span>
      </label>
      <button className="form-submit" type="submit">Submit</button>
      <p className="form-signin">
        Already have an account? <Link to="/signin">LogIn</Link>
      </p>
    </form>
  );
}
