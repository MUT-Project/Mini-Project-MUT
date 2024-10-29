import React, { useState } from "react";
import Nav from "../navbar/navbar";
import "./style_management.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faSearch } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

function Room() {
	const columns = [
		"รหัสห้อง",
		"ชื่อห้อง",
		"รหัสตึก",
		"ชั้น",
		"ระดับห้อง",
		"สถานะ",
		"ความจุ",
	];

	const Delete = () => {
		Swal.fire({
			title: "ยืนยันการลบข้อมูล",
			text: "ข้อมูลที่ถูกลบจะไม่สามารถกู้คืนได้",
			icon: "warning",
			showCancelButton: true,
			confirmButtonText: "ยืนยัน",
			cancelButtonText: "ยกเลิก",
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33"
		}).then((result) => {
			if (result.isConfirmed) {
				Swal.fire("สำเร็จ", "ข้อมูลถูกลบแล้ว", "success");
			}
		});
	};

	const submitPopup = (formData) => {
		console.log(formData);

		Swal.fire("สำเร็จ", "ข้อมูลถูกเพิ่มแล้ว", "success");
	};

	const openPopup = () => {
		Swal.fire({
			title: 'Manage Room',
			html: `
				<form id="manage-room-form" class="popup-form">
					<div class="form-row">
						<div class="form-column">
							<label>ชื่อห้อง</label>
							<input type="text" name="roomName" class="swal2-input" placeholder=" " required />
						</div>
						<div class="form-column">
							<label>ระดับห้อง</label>
							<select name="roomLevel" class="swal2-select" required>
								<option value=""> </option>
								<option value="Normal">Normal</option>
								<option value="VIP">VIP</option>
							</select>
						</div>
					</div>
					<div class="form-row">
						<div class="form-column">
							<label>ตึก</label>
							<select name="building" class="swal2-select" required>
								<option value=""> </option>
								<option value="MII">MII</option>
								<option value="MIIX">MIIX</option>
								<option value="D">D</option>
								<option value="F">F</option>
							</select>
						</div>
						<div class="form-column">
							<label>สถานะห้อง</label>
							<select name="status" class="swal2-select" required>
								<option value=""> </option>
								<option value="เปิดให้ใช้งาน">เปิดให้ใช้งาน</option>
								<option value="ปิดปรับปรุง">ปิดปรับปรุง</option>
							</select>
						</div>
					</div>
					<div class="form-row">
						<div class="form-column">
							<label>ชั้น</label>
							<select name="floor" class="swal2-select" required>
								<option value=""> </option>
								<option value="1">1</option>
								<option value="2">2</option>
								<option value="3">3</option>
								<option value="4">4</option>
								<option value="5">5</option>
								<option value="6">6</option>
								<option value="7">7</option>
								<option value="8">8</option>
							</select>
						</div>
						<div class="form-column">
							<label>ความจุ</label>
							<select name="capacity" class="swal2-select" required>
								<option value=""> </option>
								<option value="10-15">10-15</option>
								<option value="20-30">20-30</option>
							</select>
						</div>
					</div>
				</form>
			`,
			focusConfirm: false,
			showCancelButton: true,
			confirmButtonText: 'Save',
			cancelButtonText: 'Cancel',
			preConfirm: () => {
				const form = document.getElementById('manage-room-form');
				return form.reportValidity() ? form : false;
			}
		}).then((result) => {
			if (result.isConfirmed) {
				const formData = Object.fromEntries(new FormData(result.value));
				submitPopup(formData);
			}
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
							<button className="event-button">
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
							<tr>{columns.map((col, idx) => <th className="vr_table-head-cell" key={idx}>{col}</th>)}</tr>
						</thead>
						<tbody>
							<tr className="vr_table-body-row">
								<td className="vr_table-cell">101</td>
								<td className="vr_table-cell">Conference Room</td>
								<td className="vr_table-cell">B1</td>
								<td className="vr_table-cell">1</td>
								<td className="vr_table-cell">VIP</td>
								<td className="vr_table-cell">Available</td>
								<td className="vr_table-cell">10</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
}

export default Room;
