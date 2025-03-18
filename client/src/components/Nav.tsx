import React from "react";
import Logo from "./Logo.tsx";
import { Link, useNavigate } from "react-router-dom";

import {
  FaChevronRight,
  FaPencilAlt,
  FaPlusCircle,
  FaUsers,
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
          <span onClick={() => navigate("/secret")}>
            Secret room &nbsp; <FaChevronRight />
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
