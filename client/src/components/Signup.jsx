import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createMember } from "../../fetching";

export default function Signup({ token, setToken }) {
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
      setToken(result.token);
      setName("");
      setUsername("");
      setPassword("");
      setSignedin(true);
      console.log(token);
      alert("Succesfully signed up!");
    } catch (error) {
      setError("Failed to register");
      console.error(error);
    }
  }

  useEffect(() => {
    console.log("New Token:", token);
  }, [token]);

  return (
    <div className="signup">
      <h1>Create an account</h1>
      {signedin && (
        <p>
          Succesfully signed up! You can now <Link to="/login">Log in</Link>
        </p>
      )}
      {error && <p>{error}</p>}
      <form className="signupForm" onSubmit={handleSubmit}>
        <label>
          <b>Name: </b>
          <input
            type="text"
            name="name"
            id="name"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <br />

        <label>
          <b>Username: </b>
          <input
            type="text"
            name="username"
            id="username"
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
        <br />

        <label>
          <b>Password: </b>
          <input
            type="password"
            name="password"
            id="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <br />
        <br />

        <button className="signup" type="submit">
          REGISTER
        </button>
        <p>
          Have an account? <Link to="/login">Sign in</Link>
        </p>
      </form>
    </div>
  );
}
