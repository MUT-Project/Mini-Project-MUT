import React, { useState } from "react";
import "./login.css";
import Logofull from "../../assets/homepage/logo-full.png";

function Login() {
	const [inputUsername, setInputUsername] = useState("");
	const [inputPassword, setInputPassword] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		const buttonName = e.nativeEvent.submitter.name;
	
		if (buttonName === "signin") {
			if (inputUsername.trim() === "" || inputPassword.trim() === "") {
				alert("Please input Username or Password");
				return;
			}
	
			// ส่งข้อมูลไปที่ API
			fetch("http://localhost:8080/api/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					username: inputUsername,
					password: inputPassword,
				}),
			})
				.then((response) => {
					if (!response.ok) {
						throw new Error("Invalid username or password");
					}
					return response.json();
				})
				.then((data) => {
					alert(data.message); // "Login successful"
					window.location.href = "/home"; // ไปที่หน้าหลัก
				})
				.catch((error) => {
					alert(error.message); // แจ้งเตือนข้อผิดพลาด
					setInputUsername("")
					setInputPassword("")
				});
		}
	};

	return (
		<div className="bglogin">
			<div className="container-login">
				<img src={Logofull} alt="Logofull" className="logofull-img" />
				<div className="box-login">
					<h1 className="welcome-login">Welcome Back</h1>
					<form onSubmit={handleSubmit}>
						<label className="text_info-login">Username</label>
						<input
							type="text"
							value={inputUsername}
							onChange={(e) => setInputUsername(e.target.value)}
							className="info-login"
							placeholder="Enter your username"
						/>
						<label className="text_info-login">Password</label>
						<input
							type="password"
							value={inputPassword}
							onChange={(e) => setInputPassword(e.target.value)}
							className="info-login"
							placeholder="Enter your password"
						/>
						<a className="forgot-login" onClick={() => alert("I forgot my password")}>
							I forgot my password
						</a>
						<button className="signin-login" type="submit" name="signin">
							Sign In
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Login;
