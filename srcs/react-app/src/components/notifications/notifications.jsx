import React, { useState } from "react";
import './notifications.css';
import { FaCheckCircle, FaTimesCircle, FaExclamationCircle, FaTrashAlt } from 'react-icons/fa';

const initialNotifications = [
	{
		id: 1,
		message: "Your reservation has been accepted",
		detail: "D502 ready to go in 30 minutes",
		icon: <FaCheckCircle className="noti_icon success" />,
		time: "a few seconds ago"
	},
	{
		id: 2,
		message: "Your reservation has been rejected",
		detail: "CC222 has been rejected by DQ Staff",
		icon: <FaTimesCircle className="noti_icon error" />,
		time: "10 minutes ago"
	},
	{
		id: 3,
		message: "Your account has been suspended",
		detail: "We've informed you. Please contact us",
		icon: <FaExclamationCircle className="noti_icon warning" />,
		time: "a few seconds ago"
	},
];

function NotificationsPopup() {
	const [notifications, setNotifications] = useState(initialNotifications);

	const clearNotifications = () => {
		setNotifications([]);
	};

	return (
		<div className="noti_notifications-popup">
			<div className="noti_notifications-header">
				<h3>NOTIFICATIONS ({notifications.length})</h3>
				<FaTrashAlt className="noti_clear-icon" onClick={clearNotifications} title="Clear all notifications" />
			</div>
			<ul>
				{notifications.length > 0 ? (
					notifications.map((notification) => (
						<li key={notification.id} className="noti_notification-item">
							<div className="noti_notification-icon">{notification.icon}</div>
							<div className="noti_notification-content">
								<p className="noti_notification-message">{notification.message}</p>
								<p className="noti_notification-detail">{notification.detail}</p>
								<span className="noti_notification-time">{notification.time}</span>
							</div>
						</li>
					))
				) : (
					<p className="noti_no-notifications">No notifications</p>
				)}
			</ul>
		</div>
	);
}

export default NotificationsPopup;
