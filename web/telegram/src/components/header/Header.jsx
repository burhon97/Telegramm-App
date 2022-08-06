import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaPhoneAlt } from "react-icons/fa";
import { BsLayoutSidebarReverse } from "react-icons/bs";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import "./StyleHeader.css";

const Header = ({ contact }) => {
  if (!contact) return;
  return (
    <div className="header">
      <div>
        <h3 style={{ margin: "0" }}>{contact.name}</h3>
      </div>
      <div className="header-icons">
        <AiOutlineSearch />
        <FaPhoneAlt />
        <BsLayoutSidebarReverse />
        <IoEllipsisVerticalSharp />
      </div>
    </div>
  );
};

export default Header;
