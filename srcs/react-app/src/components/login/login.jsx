import React from "react";
import "../styles/login.css";
import Logofull from "../../assets/MUTfull.png";

const Login = () => {
  return (
    <div className="bglogin">
      <div className="container-login">
        <img src={Logofull} alt="Logofull" className="logofull-img" />
        <div className="box-login">
          <div className="welcome-login"> <b>Welcome Back</b> </div>
          <div className="text_info-login"> Username <h1>*</h1> </div>
          <input className="info-login"></input>
          <div className="text_info-login"> Password <h1>*</h1> </div>
          <input className="info-login"></input>
          <button className="forgot-login"> i forgot my password </button>
          <button className="register-login"> Register </button>
          <button className="signin-login"> Sign in </button>
        </div>
      </div>
    </div>
  );
};

export default Login;