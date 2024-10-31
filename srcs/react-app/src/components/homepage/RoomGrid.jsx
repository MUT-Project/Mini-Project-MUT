import React, { useEffect, useState } from "react";
import axios from "axios";
import roomImg from "../../assets/homepage/room.png";

const RoomGrid = () => {
	const [rooms, setRooms] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchRooms = async () => {
			try {
				const response = await axios.get("http://localhost:8080/api/getrooms");
				setRooms(response.data);
			} catch (err) {
				console.error("Error fetching rooms:", err);
				setError("Failed to fetch rooms");
			}
		};
	
		fetchRooms();
	}, []);
	
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
