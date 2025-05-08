import React from "react";
import Logo from "./Logo.tsx";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { useGlobalContext, ContextAppType } from "../Global.tsx";

import { HiMiniBars3 } from "react-icons/hi2";

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
        <span className="link" onClick={() => navigate("/")}>
          Home
          {pathname === "/" && <div className="dot"></div>}
        </span>
        <span className="link" onClick={() => navigate("/about")}>
          About
          {pathname === "/about" && <div className="dot"></div>}
        </span>
        <span className="link" onClick={() => navigate("/messages")}>
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
        <button className="bar-btn">
          <HiMiniBars3 />
        </button>
      </div>
    </nav>
  );
};

export default Nav;
