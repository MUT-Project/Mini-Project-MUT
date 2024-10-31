import React, { useEffect, useState } from "react";
import axios from "axios";
import roomImg from "../../assets/homepage/room.png";

const RoomGrid = () => {
	const [rooms, setRooms] = useState([]);
	const [error, setError] = useState(null);

	const fetchRooms = async () => {
		try {
			const response = await axios.get("http://localhost:8080/api/getrooms");
			if (Array.isArray(response.data)) {
				setRooms(response.data);
			} else {
				throw new Error("Response data is not an array");
			}
		} catch (err) {
			console.error("Error fetching rooms:", err);
			setError("Failed to fetch rooms");
		}
	};
	
	
	if (error) {
		return <div className="error-message">{error}</div>;
	}

	return (
		<div>
			<p className="bd_room-card-p">Rooms</p>
			<div className="r_room-grid">
				{rooms.map((room, index) => (
					<div
						className="r_room-card"
						key={index}
						onClick={() => (window.location.href = "/booking")}
					>
						<img src={roomImg} alt={room.rname} />
						<div className="r_room-info">
							<h3>Building {room.bname}</h3>
							<p>{room.rname}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default RoomGrid;
