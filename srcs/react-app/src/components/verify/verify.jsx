import React, { useEffect, useState } from "react";
import Nav from "../navbar/navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes, faSearch } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { format } from "date-fns";

function Verify() {
	const [verifyList, setVerifyList] = useState([]);

	useEffect(() => {
		const fetchBookings = async () => {
			try {
				const response = await fetch("http://localhost:8080/api/verify");
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				const data = await response.json();
				setVerifyList(data);
			} catch (error) {
				console.error("Error fetching bookings:", error);
			}
		};
		fetchBookings();
	}, []);

	const handleReject = (index) => {
		Swal.fire({
			title: "Reject Booking?",
			text: "Please tell the user why you are rejecting their booking list.",
			input: "textarea",
			inputPlaceholder: "Enter reason for rejection",
			showCancelButton: true,
			confirmButtonText: "Notify user",
			cancelButtonText: "Cancel",
		}).then((result) => {
			if (result.isConfirmed) {
				console.log(
					"Cancelled Booking for Index:",
					index,
					"Reason:",
					result.value
				);
				Swal.fire(
					"Notified",
					"User has been notified about rejection.",
					"success"
				);
			}
		});
	};

	const handleVerify = (index) => {
		Swal.fire({
			title: "Verify Booking?",
			text: "This booking will be verified.",
			icon: "success",
			confirmButtonText: "Yes, verify it!",
			showCancelButton: true,
			cancelButtonText: "Cancel",
		}).then((result) => {
			if (result.isConfirmed) {
				console.log("Verified Booking for Index:", index);
				Swal.fire("Verified!", "The booking has been verified.", "success");
			}
		});
	};

	return (
		<>
			<Nav />
			<div className="vr_select-background">
				<div className="table-zone">
					<div className="vr_table-header">
						<h2 className="vr_table-title">Booking VIP Lists</h2>
					</div>
					<table className="vr_table">
						<thead className="vr_table-head-row">
							<tr>
								<th>เลขที่รายการ</th>
								<th>ห้อง</th>
								<th>รายละเอียดการจอง</th>
								<th>วันเดือนปี</th>
								<th>เวลา</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{verifyList.map((booking, index) => (
								<tr className="vr_table-body-row" key={index}>
									<td>{index + 1}</td>
									<td>{booking.rname}</td>
									<td>{booking.details}</td>
									<td>
										{booking.start_date
											? format(new Date(booking.start_date), "dd/MM/yyyy")
											: "N/A"}
									</td>
									<td>
										{booking.Time_S ? booking.Time_S : "N/A"} -{" "}
										{booking.Time_E ? booking.Time_E : "N/A"}
									</td>
									<td>
										<div className="vr_action-buttons">
											<button
												className="vr_btn-reject"
												onClick={() => handleReject(index)}
											>
												<FontAwesomeIcon icon={faTimes} /> Reject
											</button>
											<button
												className="vr_btn-verify"
												onClick={() => handleVerify(index)}
											>
												<FontAwesomeIcon icon={faCheck} /> Verify
											</button>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
}

export default Verify;
