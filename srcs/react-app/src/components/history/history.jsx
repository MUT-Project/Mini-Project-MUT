import React, { useState } from "react";
import Nav from "../navbar/navbar";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faClock, faTimesCircle, faTimes, faEye } from '@fortawesome/free-solid-svg-icons'; // Import relevant icons

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
			confirmButtonText: "ยืนยัน",
			cancelButtonText: "ยกเลิก",
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
		}).then((result) => {
			if (result.isConfirmed) {
				Swal.fire("สำเร็จ", "การจองถูกยกเลิกแล้ว", "success");
			}
		});
	};

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
							<tr className="vr_table-body-row">
								<td className="vr_table-cell">1</td>
								<td className="vr_table-cell">1004</td>
								<td className="vr_table-cell">ห้องประชุมชั้น 5</td>
								<td className="vr_table-cell">ซ้อมมวย</td>
								<td className="vr_table-cell">12 พ.ย. 2567</td>
								<td className="vr_table-cell">14:30 - 19:30</td>
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
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
}

export default History;
