import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home.tsx";
import Inbox from "./pages/Inbox.tsx";
import Signin from "./pages/Signin.tsx";
import SecretRoom from "./pages/SecretRoom.tsx";

import Protected from "./components/Protected.tsx";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/secret" element={<SecretRoom />} />
        <Route
          path="/admin/inbox"
          element={
            // <Protected>
            <Inbox />
            // </Protected>
          }
        />
        <Route path="/admin/signin" element={<Signin />} />
      </Routes>
    </Router>
  );
};

export default App;
