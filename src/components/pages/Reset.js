import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth, sendPasswordReset } from "../../firebase";
import "./loginform.css";

function Reset() {
  const [email, setEmail] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard");
  }, [user, loading]);
  return (
    <div className="form-container">
      <div className="form-content-left">Hello</div>
      <div className="form-content-right">
        <div className="form">
          <h1>Forgot your password? Enter your email to recover your account.</h1>
          <div className="form-inputs">
            <input
              type="text"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail Address"
            />
            <button
              className="form-input-btn"
              onClick={() => sendPasswordReset(email)}
            >
              Send password reset email
            </button>
            <div>
              Don't have an account? <Link to="/register">Register</Link> now.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Reset;