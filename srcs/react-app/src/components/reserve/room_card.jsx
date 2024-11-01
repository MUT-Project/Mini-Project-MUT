import React from 'react';
import { useLocation } from 'react-router-dom';
import RoomCard from './room_card';
import './styles_booking.css';

const RoomPage = () => {
	const location = useLocation();
	const roomData = location.state || [];

	const rooms = [
		{
			imageUrl: 'room1.jpg',
			building: 'Building A',
			openDays: 'Mon-Fri',
			capacity: 30,
			roomClass: 'Lecture',
		},
		{
			imageUrl: 'room2.jpg',
			building: 'Building B',
			openDays: 'Mon-Sun',
			capacity: 50,
			roomClass: 'Seminar',
		},
	];

	return (
		<div className="room-page">
			<h1>Available Rooms</h1>
			<div className="room-card-container">
				{rooms.map((room, index) => (
					<RoomCard
						key={index}
						imageUrl={room.imageUrl}
						building={room.building}
						openDays={room.openDays}
						capacity={room.capacity}
						roomClass={room.roomClass}
					/>
				))}
			</div>
		</div>
	);
};

export default RoomPage;
