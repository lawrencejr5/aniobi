import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useGlobalContext, ContextAppType } from "../Global.tsx";
import { EndPoints } from "../enums.tsx";

import Notification from "../components/Notification.tsx";
import Nav from "../components/Nav.tsx";
import { FaEye, FaLock, FaUserCircle, FaEyeSlash } from "react-icons/fa";

const Signin = () => {
  const { setNotification, notification, setSignedIn } =
    useGlobalContext() as ContextAppType;
  const navigate = useNavigate();

  // New state variables for username, password, and showing password
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    setNotification({
      text: "Signing in...",
      status: true,
      theme: "success",
    });
    try {
      const { data } = await axios.post(`${EndPoints.admin}/login`, {
        username,
        password,
      });
      setNotification({
        text: "Successful",
        status: true,
        theme: "success",
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem("admin", JSON.stringify(data.admin));
      setSignedIn({ _id: data.admin._id, username: data.admin.username });
      setTimeout(() => {
        setIsLoading(false);
        navigate("/admin/inbox");
      }, 2000);
    } catch (err: any) {
      console.log(err);
      setIsLoading(false);
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
              <input
                type="text"
                placeholder="Admin username..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="inp-holder">
              <FaLock className="icon" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Admin password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {showPassword ? (
                <FaEyeSlash
                  className="icon"
                  onClick={() => setShowPassword(false)}
                  style={{ cursor: "pointer" }}
                />
              ) : (
                <FaEye
                  className="icon"
                  onClick={() => setShowPassword(true)}
                  style={{ cursor: "pointer" }}
                />
              )}
            </div>
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>
      </div>
      <Notification notification={notification} />
    </div>
  );
};

export default Signin;
