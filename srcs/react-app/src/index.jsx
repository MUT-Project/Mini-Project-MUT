import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './components/homepage/homepage';
import User from './components/management/user';
import History from './components/history/history';
import Room from './components/management/room';
import Report from './components/report/report';
import Reserve from './components/reserve/reserve';
import Verify from './components/verify/verify';
import Login from './components/login/login';
import Notifications from './components/notifications/notifications';
import Profile from './components/profile/profile';
import Building from './components/master/building';
import Department from './components/master/department';
import Position from './components/master/position';
import EmpStatus from './components/master/empstatus';
import RoomStatus from './components/master/roomstatus';
import BookingStatus from './components/master/bookingstatus';

import Booking from "./components/reserve/booking";
import Mylist from "./components/reserve/mylists";
import { BookingProvider } from './components/reserve/bookingcontext';

const router = createBrowserRouter([
	{
		path: "/home",
		element: <Home />
	},
	{
		path: "/user",
		element: <User />
	},
	{
		path: "/room",
		element: <Room />
	},
	{
		path: "/history",
		element: <History />
	},
	{
		path: "/building",
		element: <Building />
	},
	{
		path: "/department",
		element: <Department />
	},
	{
		path: "/position",
		element: <Position />
	},
	{
		path: "/empstatus",
		element: <EmpStatus />
	}, {
		path: "/roomstatus",
		element: <RoomStatus />
	}, {
		path: "/bookingstatus",
		element: <BookingStatus />
	},
	{
		path: "/reserve",
		element: <Reserve />
	},
	{
		path: "/mylists",
		element: <Mylist />
	},
	{
		path: "/booking",
		element: <Booking />
	},
	{
		path: "/verify",
		element: <Verify />
	},
	{
		path: "/report",
		element: <Report />
	}
	,
	{
		path: "/",
		element: <Login />
	}
	,
	{
		path: "/notifications",
		element: <Notifications />
	}
	,
	{
		path: "/profile",
		element: <Profile />
	}
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<BookingProvider>
			<RouterProvider router={router} />
		</BookingProvider>
	</React.StrictMode>
);

reportWebVitals();
