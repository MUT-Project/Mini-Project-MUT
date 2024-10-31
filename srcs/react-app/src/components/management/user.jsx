import React, { useEffect, useState } from "react";
import Nav from "../navbar/navbar";
import "./style_management.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faSearch } from '@fortawesome/free-solid-svg-icons';
import Swal from "sweetalert2";
import axios from 'axios';

function User() {
	const columns = [
		"รหัสผู้ใช้",
		"ชื่อ",
		"นามสกุล",
		"แผนก",
		"ตำแหน่ง",
		"สถานะ",
		"คะแนนผู้ใช้",
	];

	const [users, setUsers] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedUser, setSelectedUser] = useState(null);
	const [mode, setMode] = useState(null); // 'edit' or 'delete'

	useEffect(() => {
		fetchUsers();
	}, []);

	const fetchUsers = async () => {
		try {
			const response = await axios.get("http://localhost:8080/api/getuser");
			setUsers(response.data);
		} catch (error) {
			console.error("Error fetching users:", error);
		}
	};

	const openUserPopup = (title, submitAction) => {
		Swal.fire({
			title: title,
			html: `
				<form id="manage-room-form" class="popup-form">
				<div class="form-row">
				<div class="form-column">
				<label>ชื่อ</label>
				<input type="text" name="fname" class="swal2-input" placeholder=" " required />
				</div>
				<div class="form-column">
				<label>นามสกุล</label>
				<input type="text" name="lname" class="swal2-input" placeholder=" " required />
				</div>
				</div>
				<div class="form-row">
				<div class="form-column">
				<label>Username</label>
				<input type="text" name="username" class="swal2-input" placeholder=" " required />
				</div>
				<div class="form-column">
				<label>Password</label>
				<input type="password" name="password" class="swal2-input" placeholder=" " required />
				</div>
				</div>
				<div class="form-row">
				<div class="form-column">
				<label>Email</label>
				<input type="text" name="email" class="swal2-input" placeholder=" " required />
				</div>
				<div class="form-column">
				<label>แผนก</label>
				<select name="DName" class="swal2-select" required>
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
				<select name="PName" class="swal2-select" required>
				<option value=""> </option>
				<option value="Admin">Admin</option>
				<option value="Employee">Employee</option>
				</select>
				</div>
				<div class="form-column">
				<label>สถานะ</label>
				<select name="SName" class="swal2-select" required>
				<option value=""> </option>
				<option value="Active">Active</option>
				<option value="Inactive">Inactive</option>
				</select>
				</div>
				</div>
				</form>
			`,
			focusConfirm: false,
			showCancelButton: true,
			confirmButtonText: 'Submit',
			cancelButtonText: 'Cancel',
			preConfirm: () => {
				const form = document.getElementById('manage-room-form');
				return form.reportValidity() ? Object.fromEntries(new FormData(form)) : false;
			}
		}).then((result) => {
			if (result.isConfirmed) {
				submitAction(result.value);
			}
		});
	};

	// Open Edit Popup HERE!

	const openEditPopup = (user) => {
		if (!user) {
			console.error("No user data provided for editing.");
			return;
		}

		Swal.fire({
			title: 'Manage User',
			html: `
			<form id="edit-user-form" class="popup-form">
				<div class="form-row">
					<div class="form-column">
						<label>ชื่อ</label>
						<input type="text" name="fname" class="swal2-input" value="${user.fname}" required />
					</div>
					<div class="form-column">
						<label>นามสกุล</label>
						<input type="text" name="lname" class="swal2-input" value="${user.lname}" required />
					</div>
				</div>
				<div class="form-row">
					<div class="form-column">
						<label>แผนก</label>
						<select name="DName" class="swal2-select" required>
							<option value="${user.dname}" selected>${user.dname}</option>
							<option value="MII">MII</option>
							<option value="Register">Register</option>
							<option value="Finance">Finance</option>
						</select>
					</div>
						<div class="form-column">
							<label>ตำแหน่ง</label>
								<select name="PName" class="swal2-select" required>
									<option value="${user.pname}" selected>${user.pname}</option>
									<option value="Admin">Admin</option>
									<option value="Employee">Employee</option>
							</select>
						</div>
					</div>
				<div class="form-row">
					<div class="form-column">
						<label>สถานะ</label>
						<select name="SName" class="swal2-select" required>
							<option value="${user.sname}" selected>${user.sname}</option>
							<option value="Active">Active</option>
							<option value="Inactive">Inactive</option>
						</select>
					</div>
						<div class="form-column">
							<label>แก้ไขคะแนน</label>
							<button class="vr_Reset">ล้างคะแนน</button>
						</div>
				</div>
			</form>
		`,
			focusConfirm: false,
			showCancelButton: true,
			confirmButtonText: 'Update',
			cancelButtonText: 'Cancel',
			preConfirm: () => {
				const form = document.getElementById('edit-user-form');
				return form.reportValidity() ? Object.fromEntries(new FormData(form)) : false;
			}
		}).then((result) => {
			if (result.isConfirmed) {
				editPopup(result.value, user.enumber);
			}
		});
	};

	const editPopup = async (userData, userId) => {
		if (!userId) {
			Swal.fire("ข้อผิดพลาด", "ไม่พบข้อมูลผู้ใช้ที่ต้องการแก้ไข", "error");
			return;
		}

		const dataToUpdate = {
			...userData,
			ENumber: userId,
		};

		try {
			const response = await axios.put("http://localhost:8080/api/edituser", dataToUpdate);
			if (response.data.success) {
				Swal.fire("ข้อผิดพลาด", response.data.message || "เกิดข้อผิดพลาดในการแก้ไขข้อมูล", "error");
			} else {
				Swal.fire("สำเร็จ", "ข้อมูลถูกแก้ไขแล้ว", "success");
				fetchUsers();
			}
		} catch (error) {
			Swal.fire("ข้อผิดพลาด", error.response?.data?.error || "เกิดข้อผิดพลาดในการแก้ไขข้อมูล", "error");
			console.error("Error updating user:", error);
		}
	};

	const handleRowClick = (user) => {
		if (mode === "edit") {
			setSelectedUser(user);
			openEditPopup(user);
		} else if (mode === "delete") {
			handleDeleteUser(user.enumber);
		}
	};

	const filteredUsers = users.filter(user =>
		user.fname.includes(searchTerm) ||
		user.lname.includes(searchTerm) ||
		user.dname.includes(searchTerm) ||
		user.pname.includes(searchTerm) ||
		user.sname.includes(searchTerm)
	);

	const handleAddUser = () => {
		setSelectedUser(null);
		setMode(null);
		openUserPopup("Add User", submitPopup);
	};

	const handleEditMode = () => {
		setMode((prevMode) => (prevMode === "edit" ? null : "edit"));
	};

	const handleDeleteMode = () => {
		setMode("delete");
	};

	const submitPopup = async (userData) => {
		try {
			await axios.post("http://localhost:8080/api/adduser", userData);
			Swal.fire("สำเร็จ", "ข้อมูลถูกเพิ่มแล้ว", "success");
			fetchUsers();
		} catch (error) {
			Swal.fire("ข้อผิดพลาด", error.response?.data?.error || "เกิดข้อผิดพลาดในการเพิ่มผู้ใช้", "error");
			console.error("Error adding user:", error);
		}
	};

	const handleDeleteUser = async (userId) => {
		if (!userId) {
			Swal.fire("ข้อผิดพลาด", "กรุณาเลือกผู้ใช้ที่ต้องการลบ", "error");
			return;
		}

		Swal.fire({
			title: "ยืนยันการลบข้อมูล",
			text: "ข้อมูลที่ถูกลบจะไม่สามารถกู้คืนได้",
			icon: "warning",
			showCancelButton: true,
			confirmButtonText: "ยืนยัน",
			cancelButtonText: "ยกเลิก",
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			reverseButtons: true,
		}).then(async (result) => {
			if (result.isConfirmed) {
				try {
					await axios.delete("http://localhost:8080/api/deluser", { data: { ENumber: userId } });
					Swal.fire("สำเร็จ", "ข้อมูลถูกลบแล้ว", "success");
					fetchUsers();
					setSelectedUser(null);
					setMode(null);
				} catch (error) {
					Swal.fire("ข้อผิดพลาด", error.response?.data?.error || "เกิดข้อผิดพลาดในการลบผู้ใช้", "error");
					console.error("Error deleting user:", error);
				}
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
							<button className="event-button" onClick={handleAddUser}>
								<FontAwesomeIcon icon={faPlus} className="button-icon" />
								Add
							</button>
							<button className="event-button" onClick={handleEditMode}>
								<FontAwesomeIcon icon={faEdit} className="button-icon" />
								{mode === "edit" ? 'Cancel Edit' : 'Edit'}
							</button>
							<button className="event-button" onClick={handleDeleteMode}>
								<FontAwesomeIcon icon={faTrash} className="button-icon" />
								Delete
							</button>
						</div>
						<div className="search-container">
							<input
								className="input-text"
								type="text"
								placeholder="Search..."
								onChange={(e) => setSearchTerm(e.target.value)}
							/>
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
							{filteredUsers.map((user) => (
								<tr
									className="vr_table-body-row"
									key={user.enumber}
									onClick={() => handleRowClick(user)}
									style={{ cursor: mode ? "pointer" : "default" }}
								>
									<td className="vr_table-cell">{user.enumber}</td>
									<td className="vr_table-cell">{user.fname}</td>
									<td className="vr_table-cell">{user.lname}</td>
									<td className="vr_table-cell">{user.dname}</td>
									<td className="vr_table-cell">{user.pname}</td>
									<td className="vr_table-cell">{user.sname}</td>
									<td className="vr_table-cell">{user.score}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
}

export default User;
