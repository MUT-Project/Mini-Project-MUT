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
import Verify from './components/Verify/verify';
import Login from './components/login/login';
import Notifications from './components/notifications/notifications';
import Profile from './components/profile/profile';
import Building from './components/master/building';
import Department from './components/master/department';
import Position from './components/master/position';
import Status from './components/master/status';
import Booking from './components/reserve/booking';

const router = createBrowserRouter([
	{
		path: "/",
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
		path: "/status",
		element: <Status />
	},
	{
		path: "/reserve",
		element: <Reserve />
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
		path: "/login",
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
	,
	{
		path: "/booking",
	element: <Booking />
	}

])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);


reportWebVitals();
