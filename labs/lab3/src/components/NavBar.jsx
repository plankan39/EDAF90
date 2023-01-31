import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <ul className="nav nav-pills">
      <li className="nav-item">
        <Link className="nav-link active" to="/compose-salad">
            Komponera en Sallad
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/view-order">
            Se din order
        </Link>
      </li>
    </ul>
  );
};

export default NavBar;
