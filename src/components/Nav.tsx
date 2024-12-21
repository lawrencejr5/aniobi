import React from "react";
import Logo from "./Logo.tsx";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav>
      <Link to={"/"}>
        <Logo />
      </Link>
      {/* <div>
        <span>Messages</span>
        <span>Reset passkey</span>
      </div> */}
    </nav>
  );
};

export default Nav;
