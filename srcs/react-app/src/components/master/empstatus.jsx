import React, { useState } from "react";
import Nav from "../navbar/navbar";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesome
import { faPlus, faEdit, faTrash, faSearch } from "@fortawesome/free-solid-svg-icons"; // Import specific icons

function Status() {
	const columns = ["รหัสสถานะ", "สถานะพนักงาน"];
	const [Popup, setPopup] = useState(false); // State to control pop-up

	const openPopup = () => {
		setPopup(true);
		Swal.fire({
			title: 'Manage Employee',
			html: `
				<form id="manage-room-form" class="popup-form">
					<div class="form-row">
						<div class="form-column">
							<label>ชื่อสถานะ</label>
							<input type="text" name="E_statusName" class="swal2-input-depart" placeholder=" " required />
						</div>
					</div>
				</form>
			`,
			focusConfirm: false,
			showCancelButton: true,
			confirmButtonText: 'เพิ่ม',
			cancelButtonText: 'ยกเลิก',
			reverseButtons: true,
			preConfirm: () => {
				const form = document.getElementById('manage-room-form');
				return form.reportValidity() ? form : false;
			}
		}).then((result) => {
			if (result.isConfirmed) {
				const formData = Object.fromEntries(new FormData(result.value));
				Swal.fire({
					title: "สำเร็จ",
					text: "ข้อมูลถูกเพิ่มแล้ว",
					icon: "success",
					confirmButtonText: "ยืนยัน",
					confirmButtonColor: "#3085d6",
				});
			}
		});
	};

	const EditPopup = () => {
		setPopup(true);
		Swal.fire({
			title: 'Manage Employee',
			html: `
				<form id="manage-room-form" class="popup-form">
					<div class="form-row">
						<div class="form-column">
							<label>ชื่อสถานะ</label>
							<input type="text" name="E_statusName" class="swal2-input-depart" placeholder=" " required />
						</div>
					</div>
				</form>
			`,
			focusConfirm: false,
			showCancelButton: true,
			confirmButtonText: 'แก้ไข',
			cancelButtonText: 'ยกเลิก',
			reverseButtons: true,
			preConfirm: () => {
				const form = document.getElementById('manage-room-form');
				return form.reportValidity() ? form : false;
			}
		}).then((result) => {
			if (result.isConfirmed) {
				const formData = Object.fromEntries(new FormData(result.value));
				Swal.fire({
					title: "สำเร็จ",
					text: "ข้อมูลถูกแก้ไขแล้ว",
					icon: "success",
					confirmButtonText: "ยืนยัน",
					confirmButtonColor: "#3085d6",
				});
			}
		});
	};

	const Delete = () => {
		Swal.fire({
			title: "ยืนยันการลบข้อมูล",
			text: "ข้อมูลที่ถูกลบจะไม่สามารถกู้คืนได้",
			icon: "warning",
			showCancelButton: true,
			confirmButtonText: "ยืนยัน",
			cancelButtonText: "ยกเลิก",
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
		}).then((result) => {
			if (result.isConfirmed) {
				Swal.fire({
					title: "สำเร็จ",
					text: "ข้อมูลถูกลบแล้ว",
					icon: "success",
				});
			}
		});
	};

	const submitPopup = () => {
		setPopup(false);
		Swal.fire({
			title: "สำเร็จ",
			text: "ข้อมูลถูกเพิ่มแล้ว",
			icon: "success",
			confirmButtonText: "ยืนยัน",
			confirmButtonColor: "#3085d6",
		});
	};

	return (
		<>
			<Nav />
			<div className="vr_select-background">
				<div className="header-room"></div>
				<div className="table-zone">
					<div className="event-zone">
						<div className="vr_action-buttons">
							<button className="event-button" onClick={openPopup}>
								<FontAwesomeIcon icon={faPlus} className="button-icon" />
								Add
							</button>
							<button className="event-button" onClick={EditPopup}>
								<FontAwesomeIcon icon={faEdit} className="button-icon" />
								Edit
							</button>
							<button className="event-button" onClick={Delete}>
								<FontAwesomeIcon icon={faTrash} className="button-icon" />
								Delete
							</button>
						</div>
						<div className="search-container">
							<input className="input-text" type="text" placeholder="Search..." />
							<button className="input-pic">
								<FontAwesomeIcon icon={faSearch} className="search-icon" />
							</button>
						</div>
					</div>
					<table className="vr_table">
						<thead className="vr_table-head-row">
							<tr>
								{columns.map((col, idx) => (
									<th className="vr_table-head-cell" key={idx}>
										{col}
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							<tr className="vr_table-body-row">
								<td className="vr_table-cell">101</td>
								<td className="vr_table-cell">Active</td>
							</tr>
							{/* Add more rows as needed */}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
}

export default Status;