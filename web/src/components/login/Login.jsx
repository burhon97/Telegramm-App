import "./StyleLogin.css";
import { Link } from "react-router-dom";
import {Registration} from './registration/Registration'
import { useState } from "react";
import { useEffect } from "react";

export const Login = () => {
  const [statusRegist, setStatusRegist] = useState(false)
  const [registData, setRegistData] = useState([])
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  useEffect(()=>{
    fetch('http://localhost:4001/regist-list')
    .then((res)=> res.json())
    .then((loadData )=> setRegistData(loadData) )
  },[])


  const onClickLogin = () => {
    const foundData = registData.find((item)=> item.name === name && item.password === password)
    console.log(foundData);
    if(foundData) {
      localStorage.setItem('user', JSON.stringify(foundData))
    }
  }
  return (
    <div className="login">
      <h1 className="login-header">Log In</h1>
      <form className="login-form">
        <input
          type="text"
          placeholder="User name"
          className="login-input"
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          className="login-input"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button className="login-btn" onClick={onClickLogin}>
          Login
        </button>
        <br />
        <button  className="login-link" onClick={()=> setStatusRegist(true)}>
          Don't you have an account?
        </button>
      </form>
      {statusRegist && <Registration />}
    </div>
  );
};
