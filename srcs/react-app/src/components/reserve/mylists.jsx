import "./mylists.css";
import Nav from '../navbar/navbar';
import meet1 from '../../assets/meet1.jpg';

import React, { useState } from 'react';
import { Bookmark, ChevronLeft, Trash } from 'lucide-react';
import Swal from 'sweetalert2';

import { useContext } from 'react';
import BookingContext from './bookingcontext';

const RoomBooking = () => {
	const [selectAll, setSelectAll] = useState(false);
	const [selectedItems, setSelectedItems] = useState([]);
	const { bookingsList, removeBooking } = useContext(BookingContext);

	const bookings = [
		{
			id: 1,
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

	const handleClick2 = () => {
		Swal.fire({
			title: "Your booking request will be send to DQ Staff",
			text: "Are you sure about your information?",
			icon: "info",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes"
		}).then((result) => {
			if (result.isConfirmed) {
				Swal.fire({
					title: "Your booking request sent.",
					text: "You will receive massage in notification don’t forgot to check it please be right on time thank you.",
					icon: "success"
				});
			}
		});
	};

	const handleDel = () => {
		Swal.fire({
			title: "You want to remove your booking?",
			icon: "question",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes"
		}).then((result) => {
			if (result.isConfirmed) {
				Swal.fire({
					title: "Your booking removed.",
					icon: "success"
				});
			}
		});
	};

	return (
		<>
			<Nav />
			<div className="bg3">
				<div className="booking-container">
					<header className="header">
						<h1>My Lists</h1>
						<button className="my-lists-btn" onClick={() => window.location.href = "/mylists"}>
							<span>My lists</span>
							<Bookmark size={25} />
						</button>
					</header>
					<div className="back-button" role="button" onClick={() => window.location.href = "/reserve"}>
						<ChevronLeft size={20} />
						<span>Back</span>
					</div>
					<div className="select-all">
						<label>
							<input
								type="checkbox"
								checked={selectAll}
								onChange={handleSelectAll}
							/>
							<span>Select All</span>
						</label>
					</div>s
					<div className="booking-list">
						{bookingsList.map((booking) => (
							<div key={booking.id} className="booking-item">
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
								<button onClick={() => removeBooking(booking.id)} className="Trash">
									<Trash size={20} />
								</button>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default RoomBooking;
