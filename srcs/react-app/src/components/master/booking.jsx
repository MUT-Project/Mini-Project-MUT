//necessary import
import Nav from '../navbar/navbar';
import React, { useState, useEffect, useContext } from 'react';

//assets things
import "./booking.css";
import meet1 from '../../assets/meet1.jpg';

//component import
import { ChevronLeft, ChevronRight, Bookmark, CheckCircle } from 'lucide-react';
import Swal from 'sweetalert2';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function Booking() {
	
	
	const location = useLocation();
	const { roomData } = location.state || {};
	const [selectedDate, setSelectedDate] = useState(19);
	const [currentMonthIndex, setCurrentMonthIndex] = useState(10);
	const [currentYear, setCurrentYear] = useState(2024);
	const [daysInMonth, setDaysInMonth] = useState(31);
	const [startTime, setStartTime] = useState('');
	const [endTime, setEndTime] = useState('');
	const [room, setRoom] = useState("");
	const [detail, setDetail] = useState("");
	const [status, setStatus] = useState("Approved");

	// useEffect(() => {
	// 	{roomData.vip == 1 ? setStatus("Verifying") : setStatus("Approved")}
	// }, []);
	// Mock existing bookings - replace this with your actual booking data
	const existingBookings = [
		{ date: 19, startTime: '10:00', endTime: '11:30' },
		{ date: 19, startTime: '14:00', endTime: '15:30' },
	];

	const months = [
		"January", "February", "March", "April", "May", "June",
		"July", "August", "September", "October", "November", "December"
	];

	// Helper function to convert time string to minutes since midnight
	const timeToMinutes = (timeStr) => {
		const [hours, minutes] = timeStr.split(':').map(Number);
		return hours * 60 + minutes;
	};

	// Helper function to check if a time slot overlaps with existing bookings
	const isTimeSlotBooked = (time, isStartTime = true) => {
		const timeInMinutes = timeToMinutes(time);

		return existingBookings.some(booking => {
			if (booking.date !== selectedDate) return false;

			const bookingStart = timeToMinutes(booking.startTime);
			const bookingEnd = timeToMinutes(booking.endTime);

			if (isStartTime) {
				// For start time, check if it falls within any existing booking
				return timeInMinutes >= bookingStart && timeInMinutes < bookingEnd;
			} else {
				// For end time, check if the proposed time slot (from selected start to this end)
				// overlaps with any existing booking
				const selectedStartMinutes = timeToMinutes(startTime);
				return (selectedStartMinutes < bookingEnd && timeInMinutes > bookingStart);
			}
		});
	};

	// Generate time slots from 09:00 to 18:00 in 30-minute intervals
	const generateTimeSlots = () => {
		const slots = [];
		const start = 9; // 9 AM
		const end = 18; // 6 PM

		for (let hour = start; hour <= end; hour++) {
			for (let minutes of ['00', '30']) {
				if (hour === end && minutes === '30') continue; // Skip 18:30
				const formattedHour = hour.toString().padStart(2, '0');
				slots.push(`${formattedHour}:${minutes}`);
			}
		}
		return slots;
	};

	// Get available end times based on selected start time
	const getAvailableEndTimes = () => {
		if (!startTime) return [];

		const timeSlots = generateTimeSlots();
		const startIndex = timeSlots.indexOf(startTime);
		return timeSlots.slice(startIndex + 1);
	};

	const handleStartTimeChange = (e) => {
		const newStartTime = e.target.value;
		setStartTime(newStartTime);
		setEndTime(''); // Reset end time when start time changes
	};

	const isLeapYear = (year) => {
		return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
	};

	const handleMonthChange = (direction) => {
		if (direction === 'next') {
			if (currentMonthIndex === 11) {
				setCurrentMonthIndex(0);
				setCurrentYear(currentYear + 1);
			} else {
				setCurrentMonthIndex(currentMonthIndex + 1);
			}
		} else {
			if (currentMonthIndex === 0) {
				setCurrentMonthIndex(11);
				setCurrentYear(currentYear - 1);
			} else {
				setCurrentMonthIndex(currentMonthIndex - 1);
			}
		}
	};

	// Reset times when date changes
	const handleDateSelect = (day) => {
		setSelectedDate(day);
		setStartTime('');
		setEndTime('');
	};

	useEffect(() => {
		const getDaysInMonth = (monthIndex, year) => {
			switch (monthIndex) {
				case 0: return 31;
				case 1: return isLeapYear(year) ? 29 : 28;
				case 2: return 31;
				case 3: return 30;
				case 4: return 31;
				case 5: return 30;
				case 6: return 31;
				case 7: return 31;
				case 8: return 30;
				case 9: return 31;
				case 10: return 30;
				case 11: return 31;
				default: return 31;
			}
		};

		setDaysInMonth(getDaysInMonth(currentMonthIndex, currentYear));
		if (selectedDate > daysInMonth) {
			setSelectedDate(daysInMonth);
		}
	}, [currentMonthIndex, currentYear, daysInMonth, selectedDate]);

	const generateCalendarDays = () => {
		return Array.from({ length: daysInMonth }, (_, i) => i + 1);
	};

	const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

	const handleClick = () => {
		const newBooking = {
			id: Math.random(),
			date: selectedDate,
			startTime,
			endTime,
			building: "Building K K102",
			openDays: "Monday - Friday",
			capacity: "7 - 8 People",
			class: "Normal",
			bookingDetail: "bookingDetailText",
			bookTerm: "Auto verify",
		};

		Swal.fire({
			title: "Your booking added.",
			icon: "success",
		});
	};


	const addbooking = async () => {
		const formattedDate = `${String(selectedDate).padStart(2, '0')}/${String(currentMonthIndex).padStart(2, '0')}/${currentYear}`;
		try {
			const data = {
				Room_name: roomData.rname,
				Details: detail,
				Start_date: formattedDate,
				Start_time: startTime,
				End_time: endTime,
				Status_name: status
			};
	
			// แสดงข้อมูลใน Console ก่อนส่งไปที่ API
			console.log("Data to be sent:", data);
	
			const response = await axios.post('http://localhost:8080/api/addbooking', data);
			Swal.fire("สำเร็จ", "ข้อมูลถูกเพิ่มแล้ว", "success");
		} catch (error) {
			console.error("Error adding booking:", error.response?.data || error.message);
			Swal.fire("เกิดข้อผิดพลาด", "กรุณาตรวจสอบข้อมูลของคุณ", "error");
		}
	}

	return (
		<>
			<Nav />
			<div className='bg2-boo'>
				<div className="meeting-room-boo">
					<header className="header-boo">
						<h1>{roomData.bname} {roomData.rname}</h1>
						<button className="mylists-btn-boo" onClick={() => window.location.href = "/mylists"}>
							<span>My lists</span>
							<Bookmark size={25} />
						</button>
					</header>

					{/* Back button */}
					<div className="back-button-boo" role="button" onClick={() => window.location.href = "/reserve"}>
						<ChevronLeft size={20} />
						<span>Back</span>
					</div>

					<main className="content-boo">
						<div className="content__left-boo">
							<div className="room-image-boo">
								<img
									src={meet1}
									alt="Meeting Room"
								/>
							</div>
						</div>

						<div className="content__mid-boo">
							<div className="room-info-boo">
								<h2 className="room-info__title-boo">Room Information</h2>
								<div className="room-info__details-boo">
									<h3 className="room-info__building-boo">Building {roomData.bname} {roomData.rname}</h3>
									<p className="room-info__text-boo">Open: Monday - Friday</p>
									<p className="room-info__text-boo">Open time: 09:00 - 18:00</p>
									<p className="room-info__text-boo">Room Capacity: {roomData.capacity} People</p>
									<p className="room-info__text-boo">Class: {roomData.vip == 1 ? 'VIP' : 'Normal'}</p>
								</div>
								<div className="booking-boo">
									<textarea
										className="booking__textarea-boo"
										placeholder="Booking Detail"
										rows={4}
										onChange={(e) => setDetail(e.target.value)}
									/>
									<div className="booking__verify-boo">
										<span className="booking__term-boo">Booking Term :</span>
										<CheckCircle size={20} />
										<span>Auto verify after booking</span>
									</div>
								</div>
							</div>
						</div>

						<div className="content__right-boo">
							<div className="time-selector-boo">
								<div className="time-selector__group-boo">
									<label className="time-selector__label-boo">Start time</label>
									<select
										className="time-selector__select-boo"
										value={startTime}
										onChange={handleStartTimeChange}
									>
										<option value="">Select time</option>
										{generateTimeSlots().map(time => (
											<option
												key={time}
												value={time}
												disabled={isTimeSlotBooked(time, true)}
											>
												{time} {isTimeSlotBooked(time, true) ? '(Unavailable)' : ''}
											</option>
										))}
									</select>
								</div>
								<div className="time-selector__group-boo">
									<label className="time-selector__label-boo">End time</label>
									<select
										className="time-selector__select-boo"
										value={endTime}
										onChange={(e) => setEndTime(e.target.value)}
										disabled={!startTime}
									>
										<option value="">Select time</option>
										{getAvailableEndTimes().map(time => (
											<option
												key={time}
												value={time}
												disabled={isTimeSlotBooked(time, false)}
											>
												{time} {isTimeSlotBooked(time, false) ? '(Unavailable)' : ''}
											</option>
										))}
									</select>
								</div>
							</div>

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
											className={`calendar__day ${selectedDate === day ? 'calendar__day--selected' : ''}`}
											onClick={() => handleDateSelect(day)}
										>
											{day}
											{existingBookings.some(booking => booking.date === day) &&
												<span className="calendar__day-indicator" />}
										</div>
									))}
								</div>
							</div>


							<div className="booking__buttons-boo">
								<button
									type="submit"
									className="booking__button--primary-boo"
									onClick={() => addbooking()}
								>
									Book now
								</button>
							</div>
						</div>
					</main>
				</div>
			</div>
		</>
	);
}

export default Booking;
