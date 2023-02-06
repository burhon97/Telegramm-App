import { useState } from "react";
// import { Route, Routes } from "react-router-dom";
import "./App.css";
import Contacts from "./components/contacts/Contacts";
import { RightSideBar } from "./components/right-side-bar/right-side-bar";
import { Login } from "./components/login/Login";
// import { Registration } from "./components/login/registration/Registration";

function App() {
  const [selectedContact, setSelectedContact] = useState(false);

  const userString = localStorage.getItem('user')
  const user = JSON.parse(userString)

  if(!user) return(<Login />)

  return (
    <div>
      <div className="App">
        <div className="contactsApp">
          <Contacts
            onSelectContact={(contact) => setSelectedContact(contact)}
            contact={selectedContact}
            // inputRef={inputRef}
          />
        </div>
        <div className="massageFieldsApp">
          <RightSideBar
            contact={selectedContact}
            // inputRef={inputRef}
          />
        </div>
      </div>
    </div>
  );
}

export default App;


