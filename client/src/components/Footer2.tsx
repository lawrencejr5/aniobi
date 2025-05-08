import React from "react";

import { Link } from "react-router-dom";

import { useGlobalContext, ContextAppType } from "../Global";

const Footer2 = () => {
  const { logout, signedIn } = useGlobalContext() as ContextAppType;

  return (
    <footer className="footer-component">
      <span>© Aniobi 2025 &nbsp;.&nbsp;</span>
      <Link to={"/"} className="link">
        Terms and Conditions
      </Link>
      {signedIn?._id && (
        <div className="logout" style={{ cursor: "pointer" }} onClick={logout}>
          &nbsp;.&nbsp; Logout
        </div>
      )}
    </footer>
  );
};

export default Footer2;
