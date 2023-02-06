
import { useState } from "react";
import "./StyleRegistration.css";
import { useNavigate} from 'react-router-dom'


export const Registration = () => {
  const [user, setUser] = useState({
    name: "",
    password: "",
  });

  let navigate = useNavigate()

  const onChnageInput = (key) => (event) => {
    setUser({
      ...user,
      [key]: event.target.value,
    });
  };
 

  const onClickLogin = () => {
    fetch("http://localhost:4001/regist-save", {
      method: "post", 
      body: JSON.stringify(user),
      headers: {
        'Content-Type': "application/json"
      }
    })
   navigate('/')
  };

  return (
    <div className="registration">
      {/* {(getUserData.name === '' || getUserData.password === "") ? ( */}
        <div>
          <h1 className="regist-header">Registration</h1>
          <form className="regist-form">
            <input
              type="text"
              placeholder="User name"
              className="regist-input"
              onChange={onChnageInput("name")}
            />
            <input
              type="text"
              placeholder="password"
              className="regist-input"
              onChange={onChnageInput("password")}
            />
            <button className="regist-btn" onClick={onClickLogin}>
              Sign In
            </button>
          </form>
        </div>
      {/* ) : (
        <div>
          <h1>Congratulation you are registered!</h1>
          <button><Link to={'/'}></Link> </button>
        </div>
      )} */}
    </div>
  );
};
