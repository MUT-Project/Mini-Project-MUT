import "./mylists.css";
import Nav from '../navbar/navbar';
import meet1 from '../../assets/meet1.jpg';

import React, { useState } from 'react';
import { Bookmark, ChevronLeft } from 'lucide-react';


const RoomBooking = () => {
	const [selectAll, setSelectAll] = useState(false);
	const [selectedItems, setSelectedItems] = useState([]);

	const bookings = [
		{
			id: 1,
			building: "Building K K102",
			image: meet1,  // Using the imported image
			openDays: "Monday - Friday",
			capacity: "7 - 8 People",
			class: "Normal",
			time: "09:00 - 12:00",
			date: "17 September 2024",
			bookingDetail: "Tutorial",
			bookTerm: "Auto verify"
		},
		{
			id: 2,
			building: "Building K K102",
			image: meet1,
			openDays: "Monday - Friday",
			capacity: "7 - 8 People",
			class: "Normal",
			time: "09:00 - 12:00",
			date: "17 September 2024",
			bookingDetail: "Tutorial",
			bookTerm: "Auto verify"
		},
		{
			id: 3,
			building: "Building K K102",
			image: meet1,
			openDays: "Monday - Friday",
			capacity: "7 - 8 People",
			class: "Normal",
			time: "09:00 - 12:00",
			date: "17 September 2024",
			bookingDetail: "Tutorial",
			bookTerm: "Auto verify"
		}
	];

	const handleSelectAll = () => {
		setSelectAll(!selectAll);
		setSelectedItems(selectAll ? [] : bookings.map(booking => booking.id));
	};

	const handleSelectItem = (id) => {
		setSelectedItems(prev =>
			prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
		);
	};

	return (
		<>
			<Nav />
			<div className="bg3">
				<div className="booking-container">
					{/* Header */}
					<header className="header">
						<h1>My Lists</h1>
						<button className="my-lists-btn">
							<span>My lists</span>
							<Bookmark size={16} />
						</button>
					</header>

					{/* Back button */}
					<div className="back-button" role="button" onClick={() => window.location.href = "/reserve"}>
						<ChevronLeft size={20} />
						<span>Back</span>
					</div>

					{/* Select All checkbox */}
					<div className="select-all">
						<label>
							<input
								type="checkbox"
								checked={selectAll}
								onChange={handleSelectAll}
							/>
							<span>Select All</span>
						</label>
					</div>

					{/* Booking list */}
					<div className="booking-list">
						{bookings.map(booking => (
							<div key={booking.id} className="booking-item">
								<input
									type="checkbox"
									checked={selectedItems.includes(booking.id)}
									onChange={() => handleSelectItem(booking.id)}
									className="item-checkbox"
								/>
								<img src={booking.image} alt="Room" className="room-image" />
								<div className="booking-details">
									<h3>{booking.building}</h3>
									<p>Open: {booking.openDays}</p>
									<p>Room Capacity: {booking.capacity}</p>
									<p>Class: {booking.class}</p>
								</div>
								<div className="booking-time">
									<p><strong>Time:</strong> {booking.time}</p>
									<p><strong>Date:</strong> {booking.date}</p>
									<p><strong>Booking Detail:</strong> {booking.bookingDetail}</p>
									<p><strong>Book Term:</strong> {booking.bookTerm}</p>
								</div>
								<button className="bookmark-btn">
									<Bookmark size={20} />
								</button>
							</div>
						))}
					</div>

					{/* Footer */}
					<div className="footer">
						<div class="left-buttons">
							<label className="select-all-footer">
								<input
									type="checkbox"
									checked={selectAll}
									onChange={handleSelectAll}
								/>
								<span>Select All</span>
							</label>
							<button className="remove-btn">Remove</button>
						</div>
						<button className="book-now-btn">Book Now</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default RoomBooking;
