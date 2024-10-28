import React, { useState } from "react";
import Nav from "../navbar/navbar";
import "./verify.css";
import { FiAlertCircle } from "react-icons/fi";
import { IoIosCheckmarkCircle } from "react-icons/io";

function Verify() {
	const [verifyList] = useState([{}, {}, {}, {}, {}]);
	const [Add_Index, setAdd] = useState(0);
	const [isRejectOpen, setIsRejectOpen] = useState(false);
	const [isVerifyOpen, setIsVerifyOpen] = useState(false);
	const [cancelReason, setCancelReason] = useState("");

	const Add_Cancel = () => {
		setAdd(0);
	};
	const Add_Verify = () => {
		setAdd(0);
	};

	const openRejectPopup = () => {
		setIsRejectOpen(true);
	};
	const closeRejectPopup = () => {
		setIsRejectOpen(false);
		setCancelReason("");
	};
	const openVerifyPopup = () => {
		setIsVerifyOpen(true);
	};
	const closeVerifyPopup = () => {
		setIsVerifyOpen(false);
	};

	const handleCancelSubmit = () => {
		console.log("Cancel Reason:", cancelReason);
		closeRejectPopup();
	};

	return (
		<>
			<Nav />
			<div className="select-background">
				<div className="booking-container">
					<div className="table-container">
						<div className="table-header">
							<h2 className="table-title">Booking VIP Lists</h2>
						</div>
						<table>
							<thead>
								<tr>
									<th>เลขที่รายการ</th>
									<th>ห้อง</th>
									<th>รายละเอียดการจอง</th>
									<th>วันเดือนปี</th>
									<th>เวลา</th>
									<th> </th>
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
											<div className="action-buttons">
												<button className="btn-reject" onClick={openRejectPopup}>
													Reject
												</button>
												<button className="btn-verify" onClick={openVerifyPopup}>
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
						<div className="popup">
							<div className="popup-inner">
								<div
									style={{
										display: "flex",
										justifyContent: "center",
										marginBottom: "8px",
									}}
								>
									<FiAlertCircle style={{ fontSize: "64px", color: "#526D82" }} />
								</div>

								<h2 style={{ textAlign: "center" }}>Reject Bookinglist ?</h2>
								<p></p>
								<label htmlFor="cancelReason">
									Please tell user why you reject their booking list
								</label>
								<textarea
									id="cancelReason"
									value={cancelReason}
									onChange={(e) => setCancelReason(e.target.value)}
									placeholder=""
									rows="3"
									style={{ width: "100%", marginTop: "8px" }}
								/>
								<button onClick={closeRejectPopup} className="close-popup">
									Cancle
								</button>
								<button onClick={handleCancelSubmit} className="save-popup">
									Notify user
								</button>
							</div>
						</div>
					)}
					{isVerifyOpen && (
						<div className="popup">
							<div className="popup-inner">
								<div
									style={{
										display: "flex",
										justifyContent: "center",
										marginBottom: "8px",
									}}
								>
									<IoIosCheckmarkCircle
										style={{ fontSize: "64px", color: "#526D82" }}
									/>
								</div>
								<h2>Verify complete !!</h2>
								<p>We will let the user know about their booking result</p>
								<button
									onClick={() => {
										closeVerifyPopup();
									}}
									className="save-popup"
								>
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
