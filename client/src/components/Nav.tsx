import React from "react";
import Logo from "./Logo.tsx";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { useGlobalContext, ContextAppType } from "../Global.tsx";

import { HiMiniBars3 } from "react-icons/hi2";
import { HiX } from "react-icons/hi";

interface NavProps {
  page: String;
}

const Nav: React.FC<NavProps> = ({ page }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { signedIn, navBoxOpen, setNavBoxOpen } =
    useGlobalContext() as ContextAppType;
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
        <button className="bar-btn" onClick={() => setNavBoxOpen(!navBoxOpen)}>
          {!navBoxOpen ? <HiMiniBars3 /> : <HiX />}
        </button>
      </div>
      <div className={`nav-box ${navBoxOpen ? "open" : ""}`}>
        <span
          className={`link ${pathname === "/" && "active"}`}
          onClick={() => {
            navigate("/");
            setNavBoxOpen(false);
          }}
        >
          Home
        </span>
        <span
          className={`link ${pathname === "/about" && "active"}`}
          onClick={() => {
            navigate("/about");
            setNavBoxOpen(false);
          }}
        >
          About
        </span>
        <span
          className={`link ${pathname === "/messages" && "active"}`}
          onClick={() => {
            navigate("/messages");
            setNavBoxOpen(false);
          }}
        >
          Messages
        </span>
        {signedIn?.role === "super" && (
          <span
            className={`link ${pathname === "/admin/inbox" && "active"}`}
            onClick={() => {
              navigate("/admin/inbox");
              setNavBoxOpen(false);
            }}
          >
            Admin
          </span>
        )}
      </div>
    </nav>
  );
};

export default Nav;
