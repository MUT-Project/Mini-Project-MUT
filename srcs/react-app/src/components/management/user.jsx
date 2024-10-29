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

	const [Popup, setPopup] = useState(false); // State to control popup
	const openPopup = () => setPopup(true);
	const closePopup = () => setPopup(false);

	const [searchTerm, setSearchTerm] = useState(""); // State for search term
	const users = [
		{ id: "001", firstName: "John", lastName: "Doe", department: "MII", position: "หัวหน้าห้องประชุม", status: "ทำงานอยู่", score: 85 },
		// Add more user data as needed
		{ id: "002", firstName: "Jane", lastName: "Smith", department: "VET", position: "พนักงานทั่วไป", status: "ทำงานอยู่", score: 90 },
		// Additional user entries can be added here
	];

	// Function to filter users based on the search term
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
				{Popup && (
					<div className="vr_popup">
						<div className="vr_popup-inner">
							<h2>Room Details</h2>
							<form className="popup-form">
								{/* Form contents here */}
							</form>
							<div className="popup-buttons">
								<button className="vr_close-popup" onClick={closePopup}>Close</button>
								<button className="vr_save-popup" onClick={submitPopup}>Save</button>
							</div>
						</div>
					</div>
				)}
			</div>		</>
	);
}

export default User;
