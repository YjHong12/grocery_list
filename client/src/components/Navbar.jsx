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
      <Link className="navbarlink" to="/">Home </Link>
{/* <Link to={`/lists/member/`}>Lists</Link> */}
      <Link className="navbarlink" to="/login">Login </Link>
      <Link className="navbarlink" to="/signup">Sign Up </Link>

      <div className="navbarRight">
        <button className="signOutButton" onClick={signOut}>Sign Out</button>
      </div>
    </div>
  );
}
