import React from 'react';
import { Link } from 'react-router-dom';
import './styles_booking.css';

const RoomCard = ({ imageUrl, building, openDays, capacity, roomClass }) => {
	return (
		<Link to={`/roompage`} className="room-card">
			<img src={imageUrl} alt="Room" className="room-image" />
			<div className="room-details">
				<h3>{building}</h3>
				<p>Open: {openDays}</p>
				<p>Room Capacity: {capacity}</p>
				<p>Class: {roomClass}</p>
			</div>
		</Link>
	);
};

export default RoomCard;
