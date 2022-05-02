import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, Link } from "react-router-dom";
import "./loginform.css";
import { auth, db, logout } from "../../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/signin");
    fetchUserName();
  }, [user, loading]);
  return (
    <div className="form-container">
    <div className="form-content-left"></div>
    <div className="form-content-right">
        <div className="form">
          <div className="form-inputs">
            <h1>Logged in as</h1>
            <div><h1>{name}</h1></div>
            <div><h1>{user?.email}</h1></div>
            <button className="form-input-btn" onClick={logout}>
              Logout
            </button>
            <div>
              Return to the homepage <Link to="/">here</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;