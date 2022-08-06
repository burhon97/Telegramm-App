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

// const [status, setStatus] = useState(false);

// const [name, setName] = useState("");
// const [password, setPassword] = useState("");

// const getUserData = JSON.parse(localStorage.getItem("user"));

// const onClickLogin = () => {
//   setStatus(true);
// };

// if (
//   !getUserData &&
//   status === true &&
//   name === getUserData.name &&
//   password === getUserData.password
// )
//   return (
//     <div>
//       <Login
//         name={name}
//         setName={setName}
//         password={password}
//         setPassword={setPassword}
//         onClickLogin={onClickLogin}
//       />
//       <Routes>
//         <Route path="/registration" element={<Registration />} />
//       </Routes>
//     </div>
//   );
