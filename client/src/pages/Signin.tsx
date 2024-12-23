import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios"

import { useGlobalContext } from "../Global.tsx";

const Signin = () => {
  const [input, setInput] = useState<string>("");

  const navigate = useNavigate();


  const { signIn }: any = useGlobalContext();

  const handleSubmit = async (e: any): Promise<void> => {
    e.preventDefault();
    try {
       const { data } = await axios.post(`http://localhost:5000/api/v1/passkey/check`, {
        key: input,
      });
      localStorage.setItem("token", data.token);
      navigate("/admin/inbox");
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
    </div>
  );
};

export default Signin;
