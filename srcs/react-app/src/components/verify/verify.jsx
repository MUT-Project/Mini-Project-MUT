import React, { useState } from "react";
import Nav from "../navbar/navbar";
import "./verify.css";
import { FiAlertCircle } from "react-icons/fi";
import { IoIosCheckmarkCircle } from "react-icons/io";

function Verify() {
	const [verifyList] = useState([{}, {}, {}, {}, {}]);
	const [selectedIndex, setSelectedIndex] = useState(null);
	const [isRejectOpen, setIsRejectOpen] = useState(false);
	const [isVerifyOpen, setIsVerifyOpen] = useState(false);
	const [cancelReason, setCancelReason] = useState("");

	// Open/Close popups and reset fields
	const openRejectPopup = (index) => {
		setSelectedIndex(index);
		setIsRejectOpen(true);
	};
	const closeRejectPopup = () => {
		setIsRejectOpen(false);
		setCancelReason("");
		setSelectedIndex(null);
	};
	const openVerifyPopup = (index) => {
		setSelectedIndex(index);
		setIsVerifyOpen(true);
	};
	const closeVerifyPopup = () => {
		setIsVerifyOpen(false);
		setSelectedIndex(null);
	};

	// Handle Reject Action
	const handleCancelSubmit = () => {
		console.log("Cancelled Booking for Index:", selectedIndex, "Reason:", cancelReason);
		closeRejectPopup();
	};

	// Handle Verify Action
	const handleVerifySubmit = () => {
		console.log("Verified Booking for Index:", selectedIndex);
		closeVerifyPopup();
	};

	return (
		<>
			<Nav />
			<div className="vr_select-background">
				<div className="vr_booking-container">
					<div className="vr_table-container">
						<div className="vr_table-header">
							<h2 className="vr_table-title">Booking VIP Lists</h2>
						</div>
						<table className="vr_table">
							<thead>
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
								{verifyList.map((_, index) => (
									<tr key={index}>
										<td></td>
										<td></td>
										<td></td>
										<td></td>
										<td></td>
										<td>
											<div className="vr_action-buttons">
												<button className="vr_btn-reject" onClick={() => openRejectPopup(index)}>
													Reject
												</button>
												<button className="vr_btn-verify" onClick={() => openVerifyPopup(index)}>
													Verify
												</button>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>

					{isRejectOpen && (
						<div className="vr_popup">
							<div className="vr_popup-inner">
								<div style={{ display: "flex", justifyContent: "center", marginBottom: "8px" }}>
									<FiAlertCircle style={{ fontSize: "64px", color: "#526D82" }} />
								</div>
								<h2 style={{ textAlign: "center" }}>Reject Booking List?</h2>
								<label htmlFor="cancelReason">
									Please tell the user why you are rejecting their booking list
								</label>
								<textarea
									id="cancelReason"
									value={cancelReason}
									onChange={(e) => setCancelReason(e.target.value)}
									placeholder="Enter reason for rejection"
									rows="3"
									style={{ width: "100%", marginTop: "8px" }}
								/>
								<div style={{ display: "flex", justifyContent: "center", gap: "8px" }}>
									<button onClick={closeRejectPopup} className="vr_close-popup">
										Cancel
									</button>
									<button onClick={handleCancelSubmit} className="vr_save-popup">
										Notify user
									</button>
								</div>
							</div>
						</div>
					)}

					{isVerifyOpen && (
						<div className="vr_popup">
							<div className="vr_popup-inner">
								<div style={{ display: "flex", justifyContent: "center", marginBottom: "8px" }}>
									<IoIosCheckmarkCircle style={{ fontSize: "64px", color: "#526D82" }} />
								</div>
								<h2>Verify complete!</h2>
								<p>We will notify the user about their booking result.</p>
								<button onClick={handleVerifySubmit} className="vr_save-popup">
									Yes
								</button>
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	);
}

export default Verify;