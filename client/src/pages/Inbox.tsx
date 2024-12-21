import React from "react";
import Nav from "../components/Nav.tsx";
import InBox from "../components/Inbox.tsx";
import { FaChevronRight } from "react-icons/fa";

const Inbox = () => {
  return (
    <main className="inbox-main">
      <Nav />
      <h2>
        Admin &nbsp;
        <FaChevronRight />
        &nbsp; Messages
      </h2>
      <div className="inbox-container">
        <InBox />
        <InBox />
        <InBox />
        <InBox />
        <InBox />
        <InBox />
        <InBox />
        <InBox />
        <InBox />
        <InBox />
        <InBox />
      </div>
    </main>
  );
};

export default Inbox;
