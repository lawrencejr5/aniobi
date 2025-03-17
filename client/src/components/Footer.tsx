import React from "react";

import { useGlobalContext, ContextAppType } from "../Global";

const Footer = () => {
  const { logout } = useGlobalContext() as ContextAppType;
  return (
    <footer>
      <span>© 2025 Lawjun</span>&nbsp;.&nbsp;
      <span className="logout" onClick={logout}>
        Logout
      </span>
    </footer>
  );
};

export default Footer;
