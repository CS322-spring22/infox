import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../../firebase";
import "./loginform.css";
function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const register = () => {
    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(name, email, password);
  };
  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard");
  }, [user, loading]);
  return (
    <div className="form-container">
      <div className="form-content-left">
        <img className='form-img' src={"public/img/img-2.jpg"}/>
      </div>
      <div className="form-content-right">
        <div className="form">
          <h1>Get started with us today! Create your account by filling out the
          information below.</h1>
          <div className="form-inputs">
            <label className='form-label'>Full Name</label>
            <input
              type="text"
              className="form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              // placeholder="Full Name"
            />
            <label className='form-label'>Email</label>
            <input
              type="text"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              // placeholder="E-mail Address"
            />
            <label className='form-label'>Password</label>
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              // placeholder="Password"
            />
            <button className="form-input-btn" onClick={register}>
              Register
            </button>
            <button
              className="form-input-btn"
              onClick={signInWithGoogle}
            >
              Register with Google
            </button>
            <div>
              Already have an account? <Link to="/signin">Login</Link> now.
            </div>
          </div>
        </div>
      </div>
    </div>  
  );
}
export default SignUp;