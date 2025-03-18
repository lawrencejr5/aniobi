import React from "react";
import Logo from "./Logo.tsx";
import { Link, useNavigate } from "react-router-dom";

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

  const { signedIn } = useGlobalContext() as ContextAppType;
  return (
    <nav className={`${page === "home" && "fixed"}`}>
      <Link to={"/"}>
        <Logo />
      </Link>
      <div>
        {page === "home" && (
          <span className="signin-btn" onClick={() => navigate("/signin")}>
            Signin &nbsp; <FaSignInAlt />
          </span>
        )}
        {page === "dashboard" && (
          <span onClick={() => navigate("/")}>
            My Messages &nbsp; <FaMessage />
          </span>
        )}
        {page === "send" && (
          <span onClick={() => navigate("/dashboard")}>
            Dashboard &nbsp; <FaBars />
          </span>
        )}
        {page === "secret" && (
          <span onClick={() => navigate("/")}>
            Write &nbsp; <FaPencilAlt />
          </span>
        )}
        {page === "inbox" && signedIn?.role === "super" && (
          <span onClick={() => navigate("/admin/users")}>
            Admins &nbsp; <FaUsers />
          </span>
        )}
        {page === "users" && (
          <span onClick={() => navigate("/admin/inbox")}>
            Messages &nbsp; <FaMessage />
          </span>
        )}
      </div>
    </nav>
  );
};

export default Nav;
