import React from "react";

import header from "../assets/header.png";
function Header() {
  return (
    <header className="pb-3 mb-4 border-bottom">
      <img
        src={header}
        alt="Header"
        className="img-fluid rounded mx-auto d-block"
      />
    </header>
  );
}

export default Header;
