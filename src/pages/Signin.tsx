import React from "react";
import { FaArrowRight } from "react-icons/fa";

const Signin = () => {
  return (
    <div className="signin-container">
      <div className="container">
        <img src="/imgs/aniobi_icon2.jpg" alt="" />
        <form action="">
          <div className="inp-holder">
            <input type="password" placeholder="input passkey" />
            <button>&rarr;</button>
          </div>
          <span>Forgot passkey?</span>
        </form>
      </div>
    </div>
  );
};

export default Signin;
