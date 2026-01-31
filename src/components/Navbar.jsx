import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="logo">
          Aurora Scholars
        </Link>
        <nav className="nav-links" aria-label="Primary">
          <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>Home</NavLink>
          <NavLink to="/application" className={({ isActive }) => (isActive ? "active" : "")}>Application</NavLink>
          <NavLink to="/print" className={({ isActive }) => (isActive ? "active" : "")}>Print View</NavLink>
        </nav>
        <Link className="btn primary" to="/login">
          Apply now
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
