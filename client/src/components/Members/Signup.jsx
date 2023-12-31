import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createMember } from "../../../fetching";

export default function Signup() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [signedin, setSignedin] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const result = await createMember({
        name,
        username,
        password,
      });
      console.log(result);
      setName("");
      setUsername("");
      setPassword("");
      setSignedin(true);
      alert("Succesfully signed up!");
    } catch (error) {
      setError("Failed to register");
      console.error(error);
    }
  }

  useEffect(() => {}, []);

  return (
    <div className="signup">
      <h1>Create an account</h1>
      {signedin && (
        <p>
          <b>Succesfully signed up! Click to <Link to="/login">Sign in</Link></b>
        </p>
      )}
      {error && <p>{error}</p>}
      <form className="signupForm" onSubmit={handleSubmit}>
        <label>
          <b>Name: </b>
        </label>
        <input
          type="text"
          name="name"
          id="name"
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <br />

        <label>
          <b>Username: </b>
        </label>
        <input
          type="text"
          name="username"
          id="username"
          required
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
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <br />
        <br />

        <button className="signupButton" type="submit">
          REGISTER
        </button>
        <p>
          Have an account? <Link to="/login">Sign in</Link>
        </p>
      </form>
    </div>
  );
}
