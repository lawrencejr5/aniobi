import React from "react";

import { Link } from "react-router-dom";

import { useGlobalContext, ContextAppType } from "../Global";

const Footer2 = () => {
  const { logout, signedIn } = useGlobalContext() as ContextAppType;

  return (
    <footer className="footer-component">
      © Aniobi 2025 &nbsp;.&nbsp;
      <Link to={"/"} className="link">
        Terms and Conditions
      </Link>
      {signedIn?._id && (
        <>
          &nbsp;.&nbsp;
          <div
            className="logout"
            style={{ cursor: "pointer" }}
            onClick={logout}
          >
            Logout
          </div>
        </>
      )}
    </footer>
  );
};

export default Footer2;
