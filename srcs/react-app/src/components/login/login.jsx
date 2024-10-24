import React,{ useState } from "react";
import "./login.css";
import { Link } from 'react-router-dom'
import Logofull from "../../assets/Fulllogo.png";

function Login() {

   const [inputUsername, setInputUsername] = useState('');
   const [inputPassword, setInputPassword] = useState('');

   const handleSubmit = (e) => {
     e.preventDefault();

     const buttonName = e.nativeEvent.submitter.name;

     if (buttonName === 'signin') {
      if (inputUsername.trim() === '' || inputPassword.trim() === ''){
        alert('Please input Username or Password');
      }
      else{
        window.location.href = '/';
      }
     } 
     if (buttonName === 'forgot') {
        alert('i forgot my password');
    }
     else {
    }
   };

	return (
		<>
  <div className="bglogin">
      <div className="container-login">
        <img src={Logofull} alt="Logofull" className="logofull-img" />
        <div className="box-login">
          <div className="welcome-login"> <b>Welcome Back</b> </div>
          <div className="text_info-login"> Username </div>
          <form onSubmit={handleSubmit}>
          <input type="text" value={inputUsername} onChange={(e)=> setInputUsername(e.target.value)} className="info-login"></input>
          <div className="text_info-login"> Password </div>
          <input type="text" value={inputPassword} onChange={(e)=> setInputPassword(e.target.value)} className="info-login"></input>
          <button className="forgot-login" type="submit" name="forgot"> i forgot my password </button>
          <button className="signin-login" type="submit" name="signin"> Signin</button>
          </form>
        </div>
      </div>
    </div>

			{/* <Link to="/">Login</Link> */}
		</>
	);
}

export default Login;