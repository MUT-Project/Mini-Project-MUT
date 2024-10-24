import React from "react";
import "../styles/login.css";
import Logofull from "../../assets/MUTfull.png";

const Login = () => {
  return (
    <div className="bglogin">
      <div className="container">
        <img src={Logofull} alt="Logofull" className="logofull-img" />
        <div className="box">
          <div className="welcome"> <b>Welcome Back</b> </div>
          <div className="text_info"> Username <h1>*</h1> </div>
          <input className="info"></input>
          <div className="text_info"> Password <h1>*</h1> </div>
          <input className="info"></input>
          <button className="forgot"> i forgot my password </button>
          <button className="register"> Register </button>
          <button className="sign-in"> Sign in </button>
        </div>
      </div>
    </div>
  );
};

export default Login;