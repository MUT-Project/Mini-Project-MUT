import React from "react";
import Nav from '../navbar/navbar'
import { Link } from 'react-router-dom'

function Login() {
	return (
		<>
			<div>
				<h1>Login</h1>
			</div>
			<Link to="/">Login</Link>
		</>
	);
}

export default Login;