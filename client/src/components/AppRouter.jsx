import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Lists from "./Lists";
import ItemList from "./ItemList";
import Signup from "./Signup";
import Login from "./Login";
import Home from "./Home";
import Navbar from "./Navbar";

function AppRouter() {
    const [memberId, setMemberId] = useState(null);

  return (
    <BrowserRouter>
    <h1>GROCERY LIST</h1>
    <div id="navbar">
      <Navbar memberId={memberId} />
    </div>

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/lists/member/:member_id"
        element={<Lists member_id={memberId} />}
      />
    </Routes>
  </BrowserRouter>
);
}

export default AppRouter;
