import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar'
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Lists from "./components/Lists";

function App() {
  const [token, setToken] = useState("");
  // const isAuthenticated = !!token;

  return (
    <div>
      <BrowserRouter>
    <h1>GROCERY LIST</h1>
    <div id="navbar">
      <Navbar />
    </div>

    <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/lists" element={<Lists />} />
 
        </Routes>

    </BrowserRouter>

    </div>
  )
}

export default App
