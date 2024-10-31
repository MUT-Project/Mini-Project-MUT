import React, { useState } from "react";
import "./login.css";
import Logofull from "../../assets/homepage/logo-full.png";
import Swal  from "sweetalert2";

function Login() {
	const [inputUsername, setInputUsername] = useState("");
	const [inputPassword, setInputPassword] = useState("");

	const login = () => {
		Swal.fire({
			title: "สำเร็จ",
			text: "เข้าสู่ระบบสำเร็จแล้ว",
			icon: "success"
		  }).then(() => {
			window.location.href = "/home";
		  });
	}
	const Err = () => {
		Swal.fire({
			title: "ข้อผิดพลาด",
			text: "Username หรือ Password ไม่ถูกต้อง",
			icon: "error"
		});
	}
	const ErrScoremore = () => {
		Swal.fire({
			title: "ข้อผิดพลาด",
			text: "Account ถูกล็อค",
			icon: "error"
		});
	}
	const noinput = () => {
		Swal.fire({
			title: "ข้อผิดพลาด",
			text: "กรุณากรอกข้อมูล Username หรือ Password",
			icon: "warning"
		});
	}
	const forgotpassword = () => {
		Swal.fire({
			title: "ลืมรหัสผ่าน",
			text: "กรุณาติดต่อ Admin หรือ ผู้ดูแลระบบ",
			icon: "info"
		});
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		const buttonName = e.nativeEvent.submitter.name;
	
		if (buttonName === "signin") {
			if (inputUsername.trim() === "" || inputPassword.trim() === "") {
				noinput()
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
					login()
				})
				.catch((error) => {
					Err()
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
						<a className="forgot-login" onClick={() => forgotpassword()}>
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
