import ReactDOM from "react-dom";
import "./ModalContacts.css";
import { useState } from "react";


export const ModalContacts = ({ setShowModal, refreshContacts }) => {
  // const [addContactStatus, setAddContactStatus] = useState(false);
  // const [oldContacts, setOldContacts] = useState([]);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");

  const onClickCancel = () => {
    setShowModal(false);
  };
  

  const onClickAddContact = () => {
    fetch(
      `http://localhost:4001/contacts-save?name=${name}&&surname=${surname}&&phoneNumber=${phonenumber}`
    );
    // setAddContactStatus(true);
    fetch("http://localhost:4001/contacts-list")
      .then((res) => res.json()) 
      .then((loadContacts) => refreshContacts(loadContacts));
    setShowModal(false);
  };

  return ReactDOM.createPortal(
    <>
      <div className="modal-contacts">
        <div className="modal-container">
          <button className="modal-cancel" onClick={onClickCancel}>
            x
          </button>
          <div className="modal-list">
            <h1 style={{ textTransform: "uppercase" }}>Add contact</h1>
            <input
              type="text"
              value={name}
              onChange={(el) => setName(el.target.value)}
              className="modal-input"
              placeholder="name..."
            />
            <br />
            <input
              type="text"
              value={surname}
              onChange={(el) => setSurname(el.target.value)}
              className="modal-input"
              placeholder="surname..."
            />
            <br />
            <input
              type="number"
              value={phonenumber}
              onChange={(el) => setPhoneNumber(el.target.value)}
              className="modal-input"
              placeholder="phone number..."
            />
            <br />
            <button className="modal-btn" onClick={onClickCancel}>
              Cancel
            </button>
            <button className="modal-btn" onClick={onClickAddContact}>
              Add contact
            </button>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("modal-contacts")
  );
};
