import React from "react";
import '../styles/styles.css';
import { FaSignOutAlt, FaBell, FaUserCircle } from 'react-icons/fa';
import logo from '../../assets/MUT_LOGO_crop.png';

function Navbar() {
	return (
		<nav className="navbar">
			<div className="navbar-left">
				<a href="#home" className="logo">
					<img src={logo} alt="MUT Logo" />
				</a>

				<ul className="navbar-links">
					{['Reserve', 'History', 'Management', 'Master', 'Report', 'Verify'].map(item => (
						<li key={item}><a href={`#${item.toLowerCase()}`}>{item}</a></li>
					))}
				</ul>
			</div>

			<div className="navbar-icons">
				{[
					{ href: '#signout', icon: <FaSignOutAlt /> },
					{ href: '#notifications', icon: <FaBell /> },
					{ href: '#profile', icon: <FaUserCircle /> },
				].map(({ href, icon }) => (
					<a key={href} href={href} className="navbar-icon">{icon}</a>
				))}
			</div>
		</nav>
	);
}

export default Navbar;
