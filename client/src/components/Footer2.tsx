import React from "react";

import { Link } from "react-router-dom";

const Footer2 = () => {
  return (
    <footer className="footer-component">
      © Aniobi 2025 &nbsp;.&nbsp;
      <Link to={"/"} className="link">
        Terms and Conditions
      </Link>
    </footer>
  );
};

export default Footer2;
