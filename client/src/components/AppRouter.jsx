import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./Members/Signup";
import Login from "./Members/Login";
import Home from "./Home";
import Navbar from "./Navbar";
import Lists from "./List/Lists";
import ListDetails from "./List/ListDetails";

function AppRouter() {
  const [memberId, setMemberId] = useState(null);

  return (
    <BrowserRouter>
      <h1>MY GROCERY LIST</h1>
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
        <Route path="/list/:listId" element={<ListDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
