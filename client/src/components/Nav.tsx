import React from "react";
import Logo from "./Logo.tsx";
import { Link, useNavigate, useLocation } from "react-router-dom";

import {
  FaChevronRight,
  FaPencilAlt,
  FaPlusCircle,
  FaUsers,
  FaSignInAlt,
  FaBars,
} from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";

import { useGlobalContext, ContextAppType } from "../Global.tsx";

interface NavProps {
  page: String;
}

const Nav: React.FC<NavProps> = ({ page }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { signedIn } = useGlobalContext() as ContextAppType;
  return (
    <nav className={`${page === "home" && "fixed"} main-nav`}>
      <Link to={"/"}>
        <Logo />
      </Link>
      <div className="nav-links">
        <span className="" onClick={() => navigate("/")}>
          Home
          {pathname === "/" && <div className="dot"></div>}
        </span>
        <span className="" onClick={() => navigate("/about")}>
          About
          {pathname === "/about" && <div className="dot"></div>}
        </span>
        <span className="" onClick={() => navigate("/messages")}>
          Messages
          {pathname === "/messages" && <div className="dot"></div>}
        </span>
        {signedIn?.username ? (
          <span className="sign-btn" onClick={() => navigate("/dashboard")}>
            Dashboard
          </span>
        ) : (
          <span className="sign-btn" onClick={() => navigate("/signin")}>
            Signin
          </span>
        )}
      </div>
    </nav>
  );
};

export default Nav;
