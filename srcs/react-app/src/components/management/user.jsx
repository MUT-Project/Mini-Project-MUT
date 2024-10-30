import React, { useState } from "react";
import Nav from "../navbar/navbar";
import "./style_management.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faSearch } from '@fortawesome/free-solid-svg-icons';
import Swal from "sweetalert2";

function User() {
	const columns = [
		"รหัสผู้ใช้",
		"ชื่อผู้ใช้",
		"นามสกุล",
		"แผนก",
		"ตำแหน่ง",
		"สถานะ",
		"คะแนนผู้ใช้",
	];

	const [Popup, setPopup] = useState(false);
	// const openPopup = () => setPopup(true);
	// const closePopup = () => setPopup(false);

	const [searchTerm, setSearchTerm] = useState("");
	const users = [
		{ id: "001", firstName: "John", lastName: "Doe", department: "MII", position: "หัวหน้าห้องประชุม", status: "ทำงานอยู่", score: 85 },

		{ id: "002", firstName: "Jane", lastName: "Smith", department: "VET", position: "พนักงานทั่วไป", status: "ทำงานอยู่", score: 90 },
	];

	const filteredUsers = users.filter(user =>
		user.firstName.includes(searchTerm) ||
		user.lastName.includes(searchTerm) ||
		user.department.includes(searchTerm) ||
		user.position.includes(searchTerm) ||
		user.status.includes(searchTerm)
	);

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

	const EditPopup = () => {
		setPopup(false);
		Swal.fire({
			title: "สำเร็จ",
			text: "ข้อมูลถูกแก้ไขแล้ว",
			icon: "success",
			confirmButtonText: "ยืนยัน",
			confirmButtonColor: "#3085d6",
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
			reverseButtons: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33"
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
	
	const openPopup = () => {
		Swal.fire({
			title: 'Manage User',
			html: `
				<form id="manage-room-form" class="popup-form">
					<div class="form-row">
						<div class="form-column">
							<label>ชื่อ</label>
							<input type="text" name="FirstName" class="swal2-input" placeholder=" " required />
						</div>
						<div class="form-column">
							<label>นามสกุล</label>
							<input type="text" name="FirstName" class="swal2-input" placeholder=" " required />
						</div>
					</div>
					<div class="form-row">
						<div class="form-column">
							<label>Username</label>
							<input type="text" name="UserName" class="swal2-input" placeholder=" " required />
						</div>
						<div class="form-column">
							<label>Password</label>
							<input type="text" name="Password" class="swal2-input" placeholder=" " required />
						</div>
					</div>
					<div class="form-row">
						<div class="form-column">
							<label>Email</label>
							<input type="text" name="Email" class="swal2-input" placeholder=" " required />
						</div>
						<div class="form-column">
							<label>แผนก</label>
							<select name="Department" class="swal2-select" required>
								<option value=""> </option>
								<option value="MII">MII</option>
								<option value="Register">Register</option>
								<option value="Finance">Finance</option>
							</select>
						</div>
					</div>
					<div class="form-row">
						<div class="form-column">
							<label>ตำแหน่ง</label>
							<select name="Position" class="swal2-select" required>
								<option value=""> </option>
								<option value="MII">MII</option>
								<option value="Register">Register</option>
								<option value="Finance">Finance</option>
							</select>
						</div>
						<div class="form-column">
							<label>สถานะ</label>
							<select name="Status" class="swal2-select" required>
								<option value=""> </option>
								<option value="MII">MII</option>
								<option value="Register">Register</option>
								<option value="Finance">Finance</option>
							</select>
						</div>
					</div>
				</form>
			`,
			focusConfirm: false,
			showCancelButton: true,
			confirmButtonText: 'ยืนยัน',
			cancelButtonText: 'ยกเลิก',
			reverseButtons: true,
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

	const EditUser = () => {
		Swal.fire({
			title: 'Manage User',
			html: `
				<form id="manage-room-form" class="popup-form">
					<div class="form-row">
						<div class="form-column">
							<label>ชื่อ</label>
							<input type="text" name="FirstName" class="swal2-input" placeholder=" " required />
						</div>
						<div class="form-column">
							<label>นามสกุล</label>
							<input type="text" name="LastName" class="swal2-input" placeholder=" " required />
						</div>
					</div>
					<div class="form-row">
						<div class="form-column">
							<label>Username</label>
							<input type="text" name="UserName" class="swal2-input" placeholder=" " required />
						</div>
						<div class="form-column">
							<label>Email</label>
							<input type="text" name="Email" class="swal2-input" placeholder=" " required />
						</div>
					</div>
					<div class="form-row">
						<div class="form-column">
							<label>แผนก</label>
							<select name="Department" class="swal2-select" required>
								<option value=""> </option>
								<option value="MII">MII</option>
								<option value="Register">Register</option>
								<option value="Finance">Finance</option>
							</select>
						</div>
						<div class="form-column">
							<label>ตำแหน่ง</label>
							<select name="Position" class="swal2-select" required>
								<option value=""> </option>
								<option value="MII">MII</option>
								<option value="Register">Register</option>
								<option value="Finance">Finance</option>
							</select>
						</div>
					</div>
					<div class="form-row">
						<div class="form-column">
							<label>สถานะ</label>
							<select name="Status" class="swal2-select" required>
								<option value=""> </option>
								<option value="MII">MII</option>
								<option value="Register">Register</option>
								<option value="Finance">Finance</option>
							</select>
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
				EditPopup(formData);
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
							<button className="event-button" onClick={EditUser}>
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
			</div>		</>
	);
}

export default User;
