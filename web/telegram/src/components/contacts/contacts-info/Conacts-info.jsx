import "./ContactInfoStyle.css";
import { BiShare } from "react-icons/bi";
import { VscEdit } from "react-icons/vsc";
import { AiOutlineDelete } from "react-icons/ai";
import { IoHandLeftOutline } from "react-icons/io5";

export const ContactsInfo = ({ contact }) => {
  return (
    <div className="users">
      <h3 className="user-info">User info</h3>
      <div className="user-header">
        {
          <div className="user">
            <h3 className="user-name">{contact.name} {contact.surname}</h3>
            <p className="user-phone-number">Phone: <b> {contact.phoneNumber}</b></p>
          </div>
        }
      </div>
      <div className="content-user">
        <div className="content-text">
          <BiShare className="content-icon-share" />
          Share this contact
        </div>
        <div className="content-text">
          <VscEdit className="content-icon" />
          Edit contact
        </div>
        <div className="content-text">
          <AiOutlineDelete className="content-icon" /> Delete contact
        </div>
        <div className="content-text">
          <IoHandLeftOutline className="content-icon-block" /> Block user
        </div>
      </div>
    </div>
  );
};
