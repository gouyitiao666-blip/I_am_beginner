import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";
import Application from "./pages/Application.jsx";
import PrintView from "./pages/PrintView.jsx";

const App = () => {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/application" element={<Application />} />
          <Route path="/print" element={<PrintView />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
