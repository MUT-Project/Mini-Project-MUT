import React from "react";
import { Link } from 'react-router-dom'
import './navbar.css';
import { FaSignOutAlt, FaBell, FaUserCircle } from 'react-icons/fa';
import logo from '../../assets/MUT_LOGO_crop.png';

function Navbar() {
	return (
		<>
			<nav className="navbar">
				<div className="navbar-left">
					<Link to="/home" className="logo">
						<img src={logo} alt="MUT Logo" />
					</Link>
					<ul className="navbar-links">
						<li><Link to="/reserve">Reserve</Link></li>
						<li><Link to="/history">History</Link></li>
						<li className="dropdown">
							<a href="#management">Management</a>
							<ul className="dropdown-menu">
								<li><Link to="/user">User</Link></li>
								<li><Link to="/room">Room</Link></li>
							</ul>
						</li>
						<li className="dropdown">
							<a href="#master">Master</a>
							<ul className="dropdown-menu">
								<li><Link to="/department">Department</Link></li>
								<li><Link to="/position">Position</Link></li>
								<li><Link to="/building">Building</Link></li>
								<li><Link to="/status">Status</Link></li>
							</ul>
						</li>
						<li><Link to="/report">Report</Link></li>
						<li><Link to="/verify">Verify</Link></li>
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
