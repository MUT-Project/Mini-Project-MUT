import React, { useEffect, useState } from "react";
import buildingImg from "../../assets/homepage/building.png";
import { Building } from "lucide-react";

const RoomGrid = () => {
	const [rooms, setRooms] = useState([]);

	useEffect(() => {
		const fetchRooms = async () => {
			try {
				const response = await fetch("http://localhost:8080/api/getbuilding");
				if (!response.ok) {
					throw new Error("Failed to fetch rooms");
				}
				const data = await response.json();
				setRooms(data);
			} catch (error) {
				console.error(error);
			}
		};

		fetchRooms();
	}, []);

	return (
		<>
			<p className="bd_building-card-p">Rooms</p>
			<div className="bd_building-grid">
				{rooms.map((room, index) => (
					<div
						className="bd_building-card"
						key={index}
						onClick={() => window.location.href = "/reserve"}
					>
						<img src={buildingImg} alt={room.bname} />
						<h3>Building {room.bname}</h3>
					</div>
				))}
			</div>
		</>
	);
};

export default RoomGrid;
