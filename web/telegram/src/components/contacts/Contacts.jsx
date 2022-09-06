import React from "react";
import SearchContacts from "./search contacts/SearchContacts";
import "./StyleContacts.css";
import { AiOutlineMenu } from "react-icons/ai";
import ContactsFields from "./ContactsFields";

const Contacts = ({ onSelectContact, contact, inputRef }) => {
  return (
    <div className="contacts">
      <div className="header-contacts">
        <AiOutlineMenu className="icon-menu" />
        <SearchContacts />
      </div>
      <div>
        <ContactsFields
          onSelectContact={onSelectContact}
          contact={contact}
          inputRef={inputRef}
        />
      </div>
    </div>
  );
};


export default Contacts;
