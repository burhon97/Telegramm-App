import React, { useEffect, useState } from "react";
import { ModalContacts } from "./modal contacts/Modal-contacts";

// const contactsData = ContactsData;

export default function ContactsFields({ onSelectContact, inputRef }) {
  const [showModal, setShowModal] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [refreshContact, setRefreshContact] = useState([])
  

  useEffect(() => {  
    fetch("http://localhost:4001/contacts-list")
      .then((res) => res.json()) 
      .then((loadContacts) => setContacts(loadContacts));
  }, [refreshContact]);

  // const contactsString = localStorage.getItem("contacts");
  // const oldContacts = contactsString ? JSON.parse(contactsString) : [];

  const onClickContact = (contact) => {
    onSelectContact(contact);
    // inputRef.current.focus();
  };
  

  const onClickModalContacts = () => {
    setShowModal(true);
  };

  const onLogout = () => {
    localStorage.removeItem('user')
  }

  return (
    <form className="contacts-fields">
      <button className="add-contact-modal" onClick={onClickModalContacts}>
        Add contact
      </button>
      {contacts.map((contact) => (
        <div
          key={contact.id}
          className="contact"
          onClick={() => onClickContact(contact)}
        >
          <div>
            <h3 className="contact-name">
              {contact.name} {contact.surname}
            </h3>
          </div>
        </div>
      ))}

      {showModal && (
        <ModalContacts
          showModal={showModal}
          setShowModal={setShowModal}
          contacts={contacts}
          setContacts={setContacts}
          refreshContacts = {(refresh)=> setRefreshContact(refresh)}
        />
      )}
      <button onClick={onLogout} style={{position: 'absolute', bottom: '0', left: '40%'}}>Logout</button>
    </form>
  );
}
