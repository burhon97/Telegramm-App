import { useEffect } from "react";
import { useState } from "react";
import { ContactsInfo } from "../contacts/contacts-info/Conacts-info";
import Header from "../header/Header";
import InputMassage from "../input massage/InputMassage";
import { MassageFields } from "../massage fields/MassageFields";
import "./RightBar.css";

// const massageString = localStorage.getItem("massages");
// const oldMassages = massageString ? JSON.parse(massageString) : [];

export function RightSideBar({ contact, inputRef }) {
  const [newMassages, setNewMassages] = useState([]);
  const [refreshMessages, setRefreshMessages] = useState([])

  useEffect(() => {
    fetch("http://localhost:4001/message-list")
      .then((response) => response.json())
      .then((loadMessage) => setNewMassages(loadMessage));
  }, [refreshMessages]);

 
  return (  
    <div>
      {contact ? (
        <div className="right-side-bar">
          <div className="right-bar-field">
            <Header contact={contact} />
            <MassageFields contact={contact} newMassages={newMassages} />
            <InputMassage
              contact={contact}
              newMassages={newMassages}
              setNewMassages={setNewMassages}
              refreshMessages ={(refresh)=> setRefreshMessages(refresh)}
              
            />
          </div>

          <div className="right-bar-contact">
            <ContactsInfo contact={contact} />
          </div>
        </div>
      ) : (
        <div className="select-massage">
          <h2>Select massage</h2>
        </div>
      )}
    </div>
  );
}
