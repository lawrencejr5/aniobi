import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home.tsx";
import Inbox from "./pages/Inbox.tsx";
import Signin from "./pages/Signin.tsx";
import SecretRoom from "./pages/SecretRoom.tsx";

import { Protected, SuperProtected } from "./components/Protected.tsx";
import Users from "./pages/Users.tsx";
import NotAuthorized from "./pages/NotAuthorized.tsx";
import Signup from "./pages/Signup.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Send from "./pages/Send.tsx";
import Messages from "./pages/Messages.tsx";
import About from "./pages/About.tsx";
import UserMessages from "./pages/UserMessages.tsx";
import LikedMessages from "./pages/LikedMessages.tsx";
import SentMessages from "./pages/SentMessages.tsx";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/secret" element={<SecretRoom />} />
        <Route
          path="/admin/inbox"
          element={
            <SuperProtected>
              <Inbox />
            </SuperProtected>
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
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <Protected>
              <Dashboard />
            </Protected>
          }
        />
        <Route path="/messages" element={<Messages />} />
        <Route
          path="/messages/received/:user"
          element={
            <Protected>
              <UserMessages />
            </Protected>
          }
        />
        <Route
          path="/messages/liked/:user"
          element={
            <Protected>
              <LikedMessages />
            </Protected>
          }
        />
        <Route
          path="/messages/sent/:user"
          element={
            <Protected>
              <SentMessages />
            </Protected>
          }
        />
        <Route path="/send" element={<Send />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin/not-authorized" element={<NotAuthorized />} />
      </Routes>
    </Router>
  );
};

export default App;
