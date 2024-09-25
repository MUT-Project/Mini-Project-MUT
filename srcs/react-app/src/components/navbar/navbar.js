import React from "react";
import { Link } from 'react-router-dom'
import '../styles/styles.css';
import { FaSignOutAlt, FaBell, FaUserCircle } from 'react-icons/fa';
import logo from '../../assets/MUT_LOGO_crop.png';

function Navbar() {
	return (
		<nav className="navbar">
			<div className="navbar-left">
				<a href="../homepage/homapage.js" className="logo">
					<img src={logo} alt="MUT Logo" />
				</a>
				<ul className="navbar-links">
					<li><a href="#reserve">Reserve</a></li>
					<li><a href="#history">History</a></li>
					<li className="dropdown">
						<a href="#management">Management</a>
						<ul className="dropdown-menu">
							<li><a href="#User">User</a></li>
							<li><a href="#Room">Room</a></li>
						</ul>
					</li>
					<li><a href="#master">Master</a></li>
					<li><a href="#report">Report</a></li>
				</ul>
			</div>
			<div className="navbar-icons">
				<a href="#signout" className="navbar-icon"><FaSignOutAlt /></a>
				<a href="#notifications" className="navbar-icon"><FaBell /></a>
				<a href="#profile" className="navbar-icon"><FaUserCircle /></a>
			</div>
		</nav>
	);
}

export default Navbar;
