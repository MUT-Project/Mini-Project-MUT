import React, { useState } from "react";
import Nav from "../navbar/navbar";
import search from "../../assets/Search.png";
import Swal from "sweetalert2";
import { Bookmark } from "lucide-react";

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

	const [Underlined, setUnderlined] = useState(1);
	const [state, setState] = useState(1);

	const Filter_Click = (id) => {
		setUnderlined(id);
		setState(id);
	};

	const setText = (value) => {
		switch (value) {
			case 1:
				return "อนุมัติการจอง";
			case 2:
				return "รอการอนุมัติ";
			case 3:
				return "สำเร็จแล้ว";
			case 4:
				return "ไม่อนุมัติ";
			case 5:
				return "ยกเลิกการจอง";
			case 6:
				return "เลยกำหนดการ";
			default:
				return "";
		}
	};

	const setColor = (value) => {
		switch (value) {
			case 1:
				return "#15432C";
			case 2:
				return "#D08C51";
			case 3:
				return "#3B9367";
			case 4:
				return "orange";
			case 5:
				return "#FF0302";
			case 6:
				return "#633B48";
			default:
				return "#000";
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
			<div className="vr_select-background">
				<div className="table-zone">
					<h2 className="vr_table-title">History / Booking Information</h2>
					<div className="selection-zone-container">
						<div className="selection-zone-his">
							{[
								"อนุมัติ",
								"รออนุมัติ",
								"เสร็จสิ้น",
								"ถูกปฎิเสธ",
								"ยกเลิก",
								"ไม่มา",
							].map((label, index) => (
								<p
									key={index}
									className={`status-filter ${label}`}
									onClick={() => Filter_Click(index + 1)}
									style={{
										textDecoration:
											Underlined === index + 1 ? "underline" : "none",
									}}
								>
									{label}
								</p>
							))}
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
								<td
									className="vr_table-cell"
									style={{ color: setColor(Underlined) }}
								>
									<img src={search} alt="add" className="add-data" />
									{setText(Underlined)}
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
