import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./loginform.css"

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/dashboard");
  }, [user, loading]);
  return (
    <div className="form-container">
      <div className="form-content-left">Hello</div>
      <div className="form-content-right">
        <div className="form">
          <h1>Enter your login details below to access your profile.</h1>
          <div className="form-inputs">
            <div className="login__container">
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
              <button
                className="form-input-btn"
                onClick={() => logInWithEmailAndPassword(email, password)}
              >
                Login
              </button>
              <button className="form-input-btn" onClick={signInWithGoogle}>
                Login with Google
              </button>
              <div>
                <Link to="/resetpass">Forgot Password</Link>
              </div>
              <div>
                Don't have an account? <Link to="/signup">Register</Link> now.
              </div>
            </div>
          </div>
        </div>  
      </div>
    </div>
  );
}
export default Signin;