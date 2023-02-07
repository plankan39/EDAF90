import React from "react";
import { NavLink, Link } from "react-router-dom";

const NavBar = () => {
  return (
    <ul className="nav nav-tabs bg-light">
      <li className="nav-item">
        <NavLink className="nav-link" to="/">
            Grönt och Gott
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link " to="/compose-salad">
            Komponera en Sallad
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/view-order">
            Se din order
        </NavLink>
      </li>
    </ul>
  );
};

export default NavBar;
