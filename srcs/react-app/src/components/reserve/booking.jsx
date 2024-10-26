import Nav from '../navbar/navbar';
import "./booking1.css";
import meet1 from '../../assets/meet1.jpg';


import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Bookmark, CheckCircle } from 'lucide-react';

function Booking() {
	const [selectedDate, setSelectedDate] = useState(19);
	const [currentMonthIndex, setCurrentMonthIndex] = useState(8); // September (0-based index)
	const [currentYear, setCurrentYear] = useState(2021);
	const [daysInMonth, setDaysInMonth] = useState(31);

	const months = [
		"January", "February", "March", "April", "May", "June",
		"July", "August", "September", "October", "November", "December"
	];

	const isLeapYear = (year) => {
		return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
	};


	const handleMonthChange = (direction) => {
		if (direction === 'next') {
			if (currentMonthIndex === 11) { // December
				setCurrentMonthIndex(0); // January
				setCurrentYear(currentYear + 1);
			} else {
				setCurrentMonthIndex(currentMonthIndex + 1);
			}
		} else {
			if (currentMonthIndex === 0) { // January
				setCurrentMonthIndex(11); // December
				setCurrentYear(currentYear - 1);
			} else {
				setCurrentMonthIndex(currentMonthIndex - 1);
			}
		}
	};

	useEffect(() => {
		const getDaysInMonth = (monthIndex, year) => {
			switch (monthIndex) {
				case 0: return 31; // January
				case 1: return isLeapYear(year) ? 29 : 28; // February
				case 2: return 31; // March
				case 3: return 30; // April
				case 4: return 31; // May
				case 5: return 30; // June
				case 6: return 31; // July
				case 7: return 31; // August
				case 8: return 30; // September
				case 9: return 31; // October
				case 10: return 30; // November
				case 11: return 31; // December
				default: return 31; // Fallback
			}
		};

		// Update the number of days in the month whenever the month or year changes
		setDaysInMonth(getDaysInMonth(currentMonthIndex, currentYear));
		// Reset selected date if it exceeds the number of days in the month
		if (selectedDate > daysInMonth) {
			setSelectedDate(daysInMonth);
		}
	}, [currentMonthIndex, currentYear, daysInMonth, selectedDate]);

	const generateCalendarDays = () => {
		return Array.from({ length: daysInMonth }, (_, i) => i + 1);
	};

	const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

	return (
		<>
			<Nav />
			<div className="meeting-room">
				{/* Header */}
				<header className="header">
					<button className="header__back-button">
						<ChevronLeft size={20} />
						<span>Back</span>
					</button>
					<button className="header__my-list">
						<Bookmark size={20} />
						My lists
					</button>
				</header>

				{/* Main Content */}
				<main className="content">
					{/* Left Section - Room Image */}
					<div className="content__left ">
						<div className="room-image">
							<img
								src={meet1}
								alt="Meeting Room"
							/>
						</div>
					</div>

					{/* Mid Section - Room Info & Booking */}
					<div className="content__Mid">
						<div className="room-info">
							<h2 className="room-info__title">Room Information</h2>
							<div className="room-info__details">
								<h3 className="room-info__building">Building K K102</h3>
								<p className="room-info__text">Open: Monday - Friday</p>
								<p className="room-info__text">Open time: 09:00 - 18:00</p>
								<p className="room-info__text">Room Capacity: 7 - 8 People</p>
								<p className="room-info__text">Class: Normal</p>
							</div>
							{/* Booking Section */}
							<div className="booking">
								<textarea
									className="booking__textarea"
									placeholder="Booking Detail"
									rows={4}
								/>

								<div className="booking__verify">
									<span className="booking__term">Booking Term :</span>
									<CheckCircle size={20} />
									<span>Auto verify after booking</span>
								</div>

							</div>
						</div>
					</div>

					<div className="content__right">
						{/* Time Selection */}
						<div className="time-selector">
							<div className="time-selector__group">
								<label className="time-selector__label">Start time</label>
								<select className="time-selector__select">
									<option>Select time</option>
								</select>
							</div>
							<div className="time-selector__group">
								<label className="time-selector__label">End time</label>
								<select className="time-selector__select">
									<option>Select time</option>
								</select>
							</div>
						</div>

						{/* Calendar */}
						<div className="calendar">
							<div className="calendar__header">
								<ChevronLeft size={20} className="cursor-pointer" onClick={() => handleMonthChange('prev')} />
								<span>{months[currentMonthIndex]} {currentYear}</span>
								<ChevronRight size={20} className="cursor-pointer" onClick={() => handleMonthChange('next')} />
							</div>

							<div className="calendar__grid">
								{daysOfWeek.map(day => (
									<div key={day} className="calendar__day-name">
										{day}
									</div>
								))}
								{generateCalendarDays().map(day => (
									<div
										key={day}
										className={`calendar__day ${selectedDate === day ? 'calendar__day--selected' : ''
											}`}
										onClick={() => setSelectedDate(day)}
									>
										{day}
									</div>
								))}
							</div>
						</div>

						<div className="booking__buttons">
							<button className="booking__button">
								Add to lists
							</button>
							<button className="booking__button booking__button--primary">
								Book now
							</button>
						</div>
					</div>

				</main>
			</div>
		</>
	);
}

export default Booking;
