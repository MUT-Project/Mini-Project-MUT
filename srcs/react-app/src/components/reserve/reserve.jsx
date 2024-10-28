import { useState} from 'react';
import "./reserve.css";
import Nav from '../navbar/navbar';

import meet1 from '../../assets/meet1.jpg';

import { Bookmark } from "lucide-react";

function Reserve() {
	const [searchQuery, setSearchQuery] = useState("");

	const rooms = Array(2).fill({
		id: "K102",
		building: "Building K",
		openHours: "Monday - Friday",
		capacity: "7 - 8 People",
		class: "Normal",
		image: meet1,
	});

	return (
		<>
			<Nav />
			<div className="bg1">
				<div className="container">
					{/*Search and Filter Section*/}
					<div className="filter-section">
						<div className="button-wrapper">
							<button className="my-lists-btn" onClick={() => window.location.href = "/mylists"}>
								<span>My lists</span>
								<Bookmark size={20} />
							</button>
						</div>

						<div className="search-wrapper">
							<input
								type="text"
								placeholder="Search your room"
								className="search-input"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
							/>
							<button className="search-button">Search</button>
						</div>

						<div className="filter-text">Filter</div>
						<div className="filters">
							<select className="filter-select">
								<option value="" disabled selected hidden>Building</option>
							</select>
							<select className="filter-select">
								<option value="" disabled selected hidden>Date</option>
							</select>
							<select className="filter-select">
								<option value="" disabled selected hidden>Time Slot</option>
							</select>
							
							<select className="filter-select">
								<option value="" disabled selected hidden>Capacity</option>
								<option value="1">1</option>
								<option value="2">2</option>
								<option value="3">3</option>
								<option value="4">4</option>
								<option value="5">5</option>
								<option value="6">6</option>
								<option value="7">7</option>
								<option value="8">8</option>
								<option value="9">9 </option>
								<option value="10">10</option>
								<option value="11">11</option>
							</select>
							<select className="filter-select">
								<option value="" disabled selected hidden>Class</option>
								<option value={"Normal"}>Normal</option>
								<option value={"Vip"}>Vip</option>
							</select>
						</div>
					</div>

					<div className="rooms-section">
						<h2 className="section-title">Room</h2>
						<div className="room-grid">
							{rooms.map((room, index) => (
								<button
									key={index}
									className="room-card"
									onClick={() => window.location.href = "/booking"}
									//role="button"
									tabIndex={0}
								>
									<div className="room-image-container">
										<img
											src={room.image}
											alt={`${room.building} ${room.id}`}
											className="room-image"
										/>
									</div>
									<div className="room-details">
										<h3 className="room-title">{`${room.building} ${room.id}`}</h3>
										<p className="room-info-item">Open : {room.openHours}</p>
										<p className="room-info-item">
											Room Capacity : {room.capacity}
										</p>
										<p className="room-info-item">Class : {room.class}</p>
									</div>
								</button>
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Reserve;
