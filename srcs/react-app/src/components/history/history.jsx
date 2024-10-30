import React, { useState, useEffect } from "react";
import Nav from "../navbar/navbar";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faClock, faTimesCircle, faTimes, faEye } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { format } from 'date-fns';


function History() {
	const columns = [
		"ลำดับ",
		"เลขที่ใบจอง",
		"ห้องประชุม",
		"รายละเอียดการจอง",
		"วัน/เดือน/ปี",
		"เวลา",
		"สถานะ",
	];

	const [bookingHistories, setBookingHistories] = useState([]);
	const [underlined, setUnderlined] = useState(1);
	const [state, setState] = useState(1);

	const filters = [
		"อนุมัติ",
		"รออนุมัติ",
		"เสร็จสิ้น",
		"ถูกปฎิเสธ",
		"ยกเลิก",
		"ไม่มา",
	];

	const filterClick = (id) => {
		setUnderlined(id);
		setState(id);
	};

	const setText = (value) => {
		switch (value) {
			case 1: return "อนุมัติการจอง";
			case 2: return "รอการอนุมัติ";
			case 3: return "สำเร็จแล้ว";
			case 4: return "ไม่อนุมัติ";
			case 5: return "ยกเลิกการจอง";
			case 6: return "เลยกำหนดการ";
			default: return "";
		}
	};

	const setColor = (value) => {
		switch (value) {
			case 1: return "#15432C";
			case 2: return "#D08C51";
			case 3: return "#3B9367";
			case 4: return "orange";
			case 5: return "#FF0302";
			case 6: return "#633B48";
			default: return "#000";
		}
	};

	const handleCancel = () => {
		Swal.fire({
			title: "ยืนยันการยกเลิก",
			text: "คุณแน่ใจหรือไม่ว่าต้องการยกเลิกการจองนี้?",
			icon: "warning",
			showCancelButton: true,
			reverseButtons: true,
			confirmButtonText: "ยืนยัน",
			cancelButtonText: "ยกเลิก",
			cancelButtonColor: "#d33",
		}).then((result) => {
			if (result.isConfirmed) {
				Swal.fire("สำเร็จ", "การจองถูกยกเลิกแล้ว", "success");
			}
		});
	};

	const qr = () => {
		Swal.fire({
			imageUrl: "https://unsplash.it/400/200",
			imageWidth: 300,
			imageHeight: 300,
			imageAlt: "QR code"
		});
	}
	useEffect(() => {
		const fetchBookingHistory = async () => {
			try {
				const response = await axios.get('http://localhost:8080/api/bookinghistory');
				setBookingHistories(response.data);
			} catch (error) {
				console.error("Error fetching booking history:", error);
			}
		};

		fetchBookingHistory();
	}, []);


	return (
		<>
			<Nav />
			<header className="vr_header">
				<h1>History / Booking Information</h1>
			</header>
			<div className="vr_select-background">
				<div className="table-zone">
					<div className="selection-zone-container">
						<div className="selection-zone-his">
							<div className="status-filters">
								{filters.map((label, index) => (
									<p
										key={index}
										className={`status-filter ${underlined === index + 1 ? 'active' : ''}`}
										onClick={() => filterClick(index + 1)}
										style={{
											textDecoration: underlined === index + 1 ? "underline" : "none",
										}}
									>
										{label}
									</p>
								))}
							</div>
						</div>
					</div>
					<div class="table-scroll">
						<table className="vr_table">
							<thead>
								<tr>
									{columns.map((column, index) => (
										<th className="vr_table-head-cell" key={index}>
											{column}
										</th>
									))}
									<th className="vr_table-head-cell"></th>
								</tr>
							</thead>
							<tbody>
								{bookingHistories.map((bh, index) => (
									<tr className="vr_table-body-row" key={bh.bknumber}>
										<td className="vr_table-cell">{index + 1}</td>
										<td className="vr_table-cell">{bh.bknumber}</td>
										<td className="vr_table-cell">{bh.rname}</td>
										<td className="vr_table-cell">{bh.details}</td>
										<td className="vr_table-cell">
											{bh.bkdate
												? format(new Date(bh.bkdate), "dd/MM/yyyy")
												: "N/A"}
										</td>
										<td className="vr_table-cell">{bh.start_time} - {bh.end_time}</td>
										<td className="vr_table-cell" style={{ color: setColor(underlined) }}>
											<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
												{underlined === 1 ? (
													<>
														<FontAwesomeIcon icon={faCheckCircle} className="vr_icon-spacing" />
														{setText(underlined)}
													</>
												) : underlined === 2 ? (
													<>
														<FontAwesomeIcon icon={faClock} className="vr_icon-spacing" />
														{setText(underlined)}
													</>
												) : underlined === 3 ? (
													<>
														<FontAwesomeIcon icon={faEye} className="vr_icon-spacing" />
														{setText(underlined)}
													</>
												) : underlined === 4 ? (
													<>
														<FontAwesomeIcon icon={faTimesCircle} className="vr_icon-spacing" />
														{setText(underlined)}
													</>
												) : underlined === 5 ? (
													<>
														<FontAwesomeIcon icon={faTimes} className="vr_icon-spacing" />
														{setText(underlined)}
													</>
												) : underlined === 6 ? (
													<>
														<FontAwesomeIcon icon={faClock} className="vr_icon-spacing" />
														{setText(underlined)}
													</>
												) : null}
											</div>
										</td>
										{state === 1 && (
											<td className="vr_action-buttons">
												<button className="vr_btn-verify">QR Code</button>
												<button className="vr_btn-reject" onClick={handleCancel}>
													Cancel
												</button>
											</td>
										)}
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</>
	);
}

export default History;
