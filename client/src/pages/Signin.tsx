import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useGlobalContext } from "../Global.tsx";

import { EndPoints } from "../enums.tsx";

import Notification from "../components/Notification.tsx";

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
      <div className="container">
        <img src="/imgs/aniobi_icon2.jpg" alt="" />
        <form action="" onSubmit={handleSubmit}>
          <div className="inp-holder">
            <input
              type="password"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="input passkey"
            />
            <button>&rarr;</button>
          </div>
          <span>Forgot passkey?</span>
        </form>
      </div>
      <Notification notification={notification} />
    </div>
  );
};

export default Signin;
