import React from "react";
import { NavLink } from "react-router-dom";
import {
  BsHeartFill,
  BsHouseFill,
  BsInboxFill,
  BsSendFill,
} from "react-icons/bs";

import { useGlobalContext, ContextAppType } from "../Global";

const MsgNav = () => {
  const { signedIn } = useGlobalContext() as ContextAppType;

  return (
    <div className="msg-nav">
      <div className="nav-links">
        <NavLink
          end
          to="/messages"
          className={({ isActive }) => "link" + (isActive ? " active" : "")}
        >
          Feed <BsHouseFill />
        </NavLink>
        <NavLink
          to={`/messages/received/${signedIn?._id}`}
          className={({ isActive }) => "link" + (isActive ? " active" : "")}
        >
          Received <BsInboxFill />
        </NavLink>
        <NavLink
          to={`/messages/sent/${signedIn?._id}`}
          className={({ isActive }) => "link" + (isActive ? " active" : "")}
        >
          Sent <BsSendFill />
        </NavLink>
        <NavLink
          to={`/messages/liked/${signedIn?._id}`}
          className={({ isActive }) => "link" + (isActive ? " active" : "")}
        >
          Liked <BsHeartFill />
        </NavLink>
      </div>
    </div>
  );
};

export default MsgNav;
