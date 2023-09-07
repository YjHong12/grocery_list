import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const { member_id } = useParams();

  const signOut = () => {
    alert("Signed out!");
    navigate("/login");
  };


  return (
    <div className="navbar">
      <Link to="/">Home</Link>
<Link to={`/lists/member/`}>Lists</Link>
      <Link to="/login">Login</Link>
      <Link to="/signup">Sign Up</Link>

      <div className="navbarRight">
        <button onClick={signOut}>Sign Out</button>
      </div>
    </div>
  );
}
