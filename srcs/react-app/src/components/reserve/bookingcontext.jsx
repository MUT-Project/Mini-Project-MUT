import React, { createContext, useState } from 'react';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
	const [bookingsList, setBookingsList] = useState([]);

	const addBooking = (newBooking) => {
		setBookingsList((prev) => [...prev, newBooking]);
	};

	const removeBooking = (id) => {
		setBookingsList((prev) => prev.filter((booking) => booking.id !== id));
	};

	return (
		<BookingContext.Provider value={{ bookingsList, addBooking, removeBooking }}>
			{children}
		</BookingContext.Provider>
	);
};

export default BookingContext;
