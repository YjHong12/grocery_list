import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginMember } from "../../../fetching";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [memberId, setMemberId] = useState(null);
  const [memberName, setMemberName] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await loginMember(username, password);
      if (response) {
        setSuccess(true);
        setUsername("");
        setPassword("");
        setMemberId(response.member.member_id);
        setMemberName(response.member.name);
        alert("Successfully logged in!");
        navigate(`/lists/member/${response.member.member_id}`);
      } else {
        setError("Failed to login");
      }
    } catch (error) {
      console.error(error);
      setError("Failed to log in. Please try again.");
    }
  }

  // console.log("Rendering Login component");

  return (
    <div className="login">
      <h1>Log into your account</h1>
      {error && <p>{error}</p>}
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>
          <b>Username: </b>
        </label>
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <br />
        <label>
          <b>Password: </b>
        </label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <br />
        <br />
        <button className="loginButton" type="submit">
          SIGN IN
        </button>
        <p>
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </form>
    </div>
  );
}
