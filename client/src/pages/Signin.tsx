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
    try {
      const { data } = await axios.post(`${EndPoints.passkey}/check`, {
        key: input,
      });
      localStorage.setItem("token", data.token);
      setNotification({
        text: "Signing in...",
        status: true,
        theme: "success",
      });
      setInput("");
      setTimeout(() => {
        navigate("/admin/inbox");
      }, 2000);
    } catch (err) {
      console.log(err);
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
