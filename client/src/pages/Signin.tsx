import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useGlobalContext } from "../Global.tsx";

import { EndPoints } from "../enums.tsx";

import Notification from "../components/Notification.tsx";
import Nav from "../components/Nav.tsx";
import { FaEye, FaLock, FaUser, FaUserCircle } from "react-icons/fa";

const Signin = () => {
  const { setNotification, notification }: any = useGlobalContext();

  const navigate = useNavigate();

  const [input, setInput] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setNotification({
      text: "Signing in...",
      status: true,
      theme: "success",
    });
    try {
      setInput("");
      const { data } = await axios.post(`${EndPoints.passkey}/check`, {
        key: input,
      });
      setNotification({
        text: "Successful",
        status: true,
        theme: "success",
      });
      localStorage.setItem("token", data.token);
      setTimeout(() => {
        navigate("/admin/inbox");
      }, 2000);
    } catch (err: any) {
      console.log(err);

      setNotification({
        text: `${err?.response?.data?.msg}`,
        status: true,
        theme: "danger",
      });
    }
  };

  return (
    <div className="signin-container">
      <Nav page={"secret"} />
      <div className="container">
        <form onSubmit={handleSubmit}>
          <h1>Admin signin</h1>
          <div className="inp-container">
            <div className="inp-holder">
              <FaUserCircle className="icon" />
              <input type="text" placeholder="Admin username..." />
            </div>
            <div className="inp-holder">
              <FaLock className="icon" />
              <input type="password" placeholder="Admin password..." />
              <FaEye className="icon" />
            </div>
            <button>Sign in</button>
          </div>
        </form>
      </div>
      <Notification notification={notification} />
    </div>
  );
};

export default Signin;
