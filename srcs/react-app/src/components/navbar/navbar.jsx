import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import './navbar.css';
import { FaSignOutAlt, FaBell, FaUserCircle } from 'react-icons/fa';
import logo from '../../assets/MUT_LOGO_crop.png';

function Navbar() {
	const [authority, setAuthority] = useState("000000");

	useEffect(() => {
		const fetchAuthority = async () => {
			try {
				const response = await fetch(
					`http://localhost:8080/api/navbar`
				);
				const data = await response.json();
				setAuthority(data.accessno);
			} catch (error) {
				console.error("Error fetching history:", error);
			}
		};

		fetchAuthority();
	}, []);

	return (
		<>
			<nav className="navbar">
				<div className="navbar-left">
					<Link to="/home" className="logo">
						<img src={logo} alt="MUT Logo" />
					</Link>
					<ul className="navbar-links">
						{authority.charAt(0) === '1' && (
							<>
								<li><Link to="/reserve">Reserve</Link></li>
							</>
						)}
						{authority.charAt(1) === '1' && (
							<>
								<li><Link to="/history">History</Link></li>
							</>
						)}
						{authority.charAt(2) === '1' && (
							<>
								<li className="dropdown">
									<a href="#management">Management</a>
									<ul className="dropdown-menu">
										<li><Link to="/user">User</Link></li>
										<li><Link to="/room">Room</Link></li>
									</ul>
								</li>
							</>
						)}
						{authority.charAt(3) === '1' && (
							<>
								<li className="dropdown">
									<a href="#master">Master</a>
									<ul className="dropdown-menu">
										<li><Link to="/department">Department</Link></li>
										<li><Link to="/position">Position</Link></li>
										<li><Link to="/building">Building</Link></li>
										<li><Link to="/status">Status</Link></li>
									</ul>
								</li>
							</>
						)}
						{authority.charAt(4) === '1' && (
							<>
								<li><Link to="/report">Report</Link></li>
							</>
						)}
						{authority.charAt(5) === '1' && (
							<>
								<li><Link to="/verify">Verify</Link></li>
							</>
						)}
					</ul>
				</div>
				<div className="navbar-icons">
					<Link to="/" className="navbar-icon"><FaSignOutAlt /></Link>
					<Link to="/notifications" className="navbar-icon"><FaBell /></Link>
					<Link to="/profile" className="navbar-icon"><FaUserCircle /></Link>
				</div>
			</nav>
		</>
	);
}

export default Navbar;
