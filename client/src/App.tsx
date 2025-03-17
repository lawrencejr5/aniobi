import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home.tsx";
import Inbox from "./pages/Inbox.tsx";
import Signin from "./pages/Signin.tsx";
import SecretRoom from "./pages/SecretRoom.tsx";

import { Protected, SuperProtected } from "./components/Protected.tsx";
import Users from "./pages/Users.tsx";
import NotAuthorized from "./pages/NotAuthorized.tsx";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/secret" element={<SecretRoom />} />
        <Route
          path="/admin/inbox"
          element={
            <Protected>
              <Inbox />
            </Protected>
          }
        />
        <Route
          path="/admin/users"
          element={
            <SuperProtected>
              <Users />
            </SuperProtected>
          }
        />
        <Route path="/admin/signin" element={<Signin />} />
        <Route path="/admin/not-authorized" element={<NotAuthorized />} />
      </Routes>
    </Router>
  );
};

export default App;
