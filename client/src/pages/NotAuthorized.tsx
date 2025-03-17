import React from "react";
import { Link } from "react-router-dom";

import Nav from "../components/Nav";

const NotAuthorized = () => {
  return (
    <main className="admin-main">
      <Nav page={"forbidden"} />
      <div className="not-authorized-container">
        <h1>403 Forbidden</h1>
        <p>You're not authorized to view this page.</p>
        <Link className="btn-back" to="/admin/inbox">
          Return to Inbox
        </Link>
      </div>
    </main>
  );
};

export default NotAuthorized;
