import React, { useState } from "react";
import Nav from "../navbar/navbar";
import search from "../../assets/Search.png";
import "./history.css";
import Swal from 'sweetalert2'

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
	const [state, setstate] = useState(1);
	const Filter_Click = (id) => {
		setUnderlined(id);
		setstate(id);
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
		}
	};

	return (
		<>
			<Nav />
			<div className="all_componant">
				<div className="header-his"></div>
				<div className="selection-zone">
					<p
						className="upcomming"
						onClick={() => Filter_Click(1)}
						style={{
							textDecoration: Underlined === 1 ? "underline" : "none",
							cursor: "pointer",
						}}
					>
						upcomming
					</p>

					<p
						className="On_Progress"
						onClick={() => Filter_Click(2)}
						style={{
							textDecoration: Underlined === 2 ? "underline" : "none",
							cursor: "pointer",
						}}
					>
						On_Progress
					</p>

					<p
						className="Complete"
						onClick={() => Filter_Click(3)}
						style={{
							textDecoration: Underlined === 3 ? "underline" : "none",
							cursor: "pointer",
						}}
					>
						Complete
					</p>

					<p
						className="Uncomplete"
						onClick={() => Filter_Click(4)}
						style={{
							textDecoration: Underlined === 4 ? "underline" : "none",
							cursor: "pointer",
						}}
					>
						Uncomplete
					</p>

					<p
						className="Canceled"
						onClick={() => Filter_Click(5)}
						style={{
							textDecoration: Underlined === 5 ? "underline" : "none",
							cursor: "pointer",
						}}
					>
						Canceled
					</p>

					<p
						className="Not_Coming"
						onClick={() => Filter_Click(6)}
						style={{
							textDecoration: Underlined === 6 ? "underline" : "none",
							cursor: "pointer",
						}}
					>
						Not coming on time
					</p>
				</div>

				<div className="table-zone">
					<table className="table_data">
						<thead className="table_header">
							<tr>
								{/* ใช้ map เพื่อสร้าง <th> ทั้ง 7 คอลัมน์เมื่อมีการคลิก */}
								{columns.map((column, index) => (
									<th key={index}>{column}</th>
								))}
								<th></th>
							</tr>
						</thead>

						<th className="table_record">
							<p>1</p>
						</th>
						<th className="table_record">
							<p>1004</p>
						</th>
						<th className="table_record">
							<p>ห้องประชุมชั้น 5</p>
						</th>
						<th className="table_record">
							<p>ซ้อมมวย</p>
						</th>
						<th className="table_record">
							<p>12 พ.ย. 2567</p>
						</th>
						<th className="table_record">
							<p>14:30 - 19:30</p>
						</th>

						<th
							className="table_record"
							style={{ color: setColor(Underlined) }}
						>
							<img src={search} alt="add" className="add-data" />
							{setText(Underlined)}
						</th>
						{state === 1 && (
							<th className="table_record">
								<button className="table_button">QR Code</button>
								<button className="table_button">Cancel</button>
							</th>
						)}
					</table>
				</div>
			</div>
		</>
	);
}

export default History;
