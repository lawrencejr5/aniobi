import React from "react";
import Logo from "./Logo.tsx";
import { Link, useNavigate } from "react-router-dom";

import { FaChevronRight, FaPencilAlt, FaPlusCircle } from "react-icons/fa";

interface NavProps {
  page: String;
}

const Nav: React.FC<NavProps> = ({ page }) => {
  const navigate = useNavigate();
  return (
    <nav>
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
        {page === "inbox" && (
          <span onClick={() => navigate("/")}>
            Create user &nbsp; <FaPlusCircle />
          </span>
        )}
      </div>
    </nav>
  );
};

export default Nav;
