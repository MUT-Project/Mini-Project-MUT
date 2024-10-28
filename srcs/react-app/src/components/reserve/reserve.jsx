//necessary import
import Nav from '../navbar/navbar';
import { useState } from 'react';

//assets things
import "./reserve.css";
import meet1 from '../../assets/meet1.jpg';

//component import
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
			<div className="bg1-res">
				<div className="container-res">
					{/*Search and Filter Section*/}
					<div className="filter-section-res">
						<div className="button-wrapper-res">
							<button className="mylists-btn-res" onClick={() => window.location.href = "/mylists"}>
								<span>My lists</span>
								<Bookmark size={20} />
							</button>
						</div>
						<form className="search-wrapper-res">
							<input
								type="text"
								placeholder="Search your room"
								className="search-input-res"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
							/>
							<button className="search-button-res" type='submit'>Search</button>
						</form>

						<div className="filter-text-res">Filter</div>
						<form className="filters-res">
							<input type="date" className="filter-select-res date" id="date" />
							<input type="time" className="filter-select-res starttime" id="timepicker1" />
							<input type="time" className="filter-select-res endtime" id="timepicker2" />
							<input type="number" className="filter-select-res capacity" placeholder="Capacity" />
							<input type="text" className="filter-select-res class" placeholder="Class" />
						</form>
					</div>

					<div className="rooms-section-res">
						<h2 className="section-title-res">Room</h2>
						<div className="room-grid-res">
							{rooms.map((room, index) => (
								<button
									key={index}
									className="room-card-res"
									onClick={() => window.location.href = "/booking"}
									tabIndex={0}
								>
									<div className="room-image-container-res">
										<img
											src={room.image}
											alt={`${room.building} ${room.id}`}
											className="room-image-res"
										/>
									</div>
									<div className="room-details-res">
										<h3 className="room-title-res">{`${room.building} ${room.id}`}</h3>
										<p className="room-info-item-res">Open : {room.openHours}</p>
										<p className="room-info-item-res">
											Room Capacity : {room.capacity}
										</p>
										<p className="room-info-item-res">Class : {room.class}</p>
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
