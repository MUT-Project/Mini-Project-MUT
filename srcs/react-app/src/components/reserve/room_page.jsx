import Nav from '../navbar/navbar';
import Room from '../../assets/meet1.jpg';
import React, { useState } from 'react';
import './styles_booking.css';

const BookingPage = () => {
	const [startTime, setStartTime] = useState('');
	const [endTime, setEndTime] = useState('');
	const [selectedDate, setSelectedDate] = useState('');

	const handleBookNow = () => {
		alert('Booking Confirmed');
	};

	return (
		<>
		<Nav />
		<div className="booking-page">
			<header className="booking-header">
				<h1>Booking Page NORMAL 1</h1>
			</header>
			<div className="booking-container">
				<div className="room-image-section">
					<img src={Room} alt="Room" className="room-image" />
					<h2>Building K K102</h2>
				</div>

				<div className="booking-info-section">
					<h3>Room Information</h3>
					<p><strong>Building K K102</strong></p>
					<p>Open: Monday - Friday</p>
					<p>Open time: 09:00 - 18:00</p>
					<p>Room Capacity: 7 - 8 People</p>
					<p>Class: Normal</p>

					<div className="booking-form">
						<label>Booking Detail</label>
						<textarea placeholder="Enter booking details here"></textarea>

						<div className="time-date-selectors">
							<div className="time-selector">
								<label>Start time</label>
								<input
									type="time"
									value={startTime}
									onChange={(e) => setStartTime(e.target.value)}
								/>
							</div>
							<div className="time-selector">
								<label>End time</label>
								<input
									type="time"
									value={endTime}
									onChange={(e) => setEndTime(e.target.value)}
								/>
							</div>
						</div>

						<div className="date-selector">
							<label>Select date</label>
							<input
								type="date"
								value={selectedDate}
								onChange={(e) => setSelectedDate(e.target.value)}
							/>
						</div>

						<div className="booking-terms">
							<p>Booking Term: <span>✅ Auto verify after booking</span></p>
						</div>

						<div className="booking-actions">
							<button className="add-to-list">Add to lists</button>
							<button className="book-now" onClick={handleBookNow}>Book now</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		</>
	);
};

export default BookingPage;
