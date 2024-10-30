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
		"ชื่อผู้ใช้",
		"นามสกุล",
		"แผนก",
		"ตำแหน่ง",
		"สถานะ",
		"คะแนนผู้ใช้",
	];

	const [users, setUsers] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedUser, setSelectedUser] = useState(null);
	const [isEditMode, setIsEditMode] = useState(false);
	const [isRowSelected, setIsRowSelected] = useState(false);


	const departments = ["MII", "Register", "Finance"];
	const positions = ["Admin", "Employee"];

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

	const filteredUsers = users.filter(user =>
		user.fname.includes(searchTerm) ||
		user.lname.includes(searchTerm) ||
		user.dname.includes(searchTerm) ||
		user.pname.includes(searchTerm) ||
		user.sname.includes(searchTerm)
	);

	const handleAddUser = () => {
		setSelectedUser(null);
		setIsEditMode(false);
		openUserPopup("Add User", submitPopup);
	};

	const handleEditMode = () => {
		setIsEditMode(true);
	};

	const handleRowClick = (user) => {
		if (isEditMode) {
			if (isRowSelected) {
				setIsRowSelected(false);
				setSelectedUser(null);
			} else {
				setSelectedUser(user);
				setIsRowSelected(true);
				openUserPopup("Edit User", editPopup);
			}
		}
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

	const editPopup = async (userData) => {
		try {
			await axios.put("http://localhost:8080/api/edituser", { ...userData, ENUMBER: selectedUser.ENumber });
			Swal.fire("สำเร็จ", "ข้อมูลถูกแก้ไขแล้ว", "success");
			fetchUsers();
		} catch (error) {
			console.error("Error updating user:", error);
		}
	};

	const handleDeleteUser = (userId) => {
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
					await axios.delete("http://localhost:8080/api/deluser", { data: { ENUMBER: userId } });
					Swal.fire("สำเร็จ", "ข้อมูลถูกลบแล้ว", "success");
					fetchUsers();
				} catch (error) {
					console.error("Error deleting user:", error);
				}
			}
		});
	};

	const openUserPopup = (title, submitAction) => {
		Swal.fire({
			title,
			html: `
				<form id="manage-user-form" class="popup-form">
					<div class="form-row">
						<div class="form-column">
							<label>ชื่อ</label>
							<input type="text" name="FName" class="swal2-input" placeholder=" " required value="${selectedUser?.fname || ''}" />
						</div>
						<div class="form-column">
							<label>นามสกุล</label>
							<input type="text" name="LName" class="swal2-input" placeholder=" " required value="${selectedUser?.lname || ''}" />
						</div>
					</div>
					<div class="form-row">
						<div class="form-column">
							<label>แผนก</label>
							<select name="DName" class="swal2-select" required>
								<option value=""> </option>
								${departments.map(department => `<option value="${department}" ${selectedUser?.dname === department ? 'selected' : ''}>${department}</option>`).join('')}
							</select>
						</div>
						<div class="form-column">
							<label>ตำแหน่ง</label>
							<select name="PName" class="swal2-select" required>
								<option value=""> </option>
								${positions.map(position => `<option value="${position}" ${selectedUser?.pname === position ? 'selected' : ''}>${position}</option>`).join('')}
							</select>
						</div>
					</div>
					<div class="form-row">
						<div class="form-column">
							<label>สถานะ</label>
							<select name="SName" class="swal2-select" required>
								<option value=""> </option>
								<option value="Active">ทำงานอยู่</option>
								<option value="Inactive">ลางาน</option>
							</select>
						</div>
					</div>
				</form>
			`,
			focusConfirm: false,
			showCancelButton: true,
			confirmButtonText: 'ยืนยัน',
			cancelButtonText: 'ยกเลิก',
			preConfirm: () => {
				const form = document.getElementById('manage-user-form');
				return form.reportValidity() ? Object.fromEntries(new FormData(form)) : false;
			}
		}).then((result) => {
			if (result.isConfirmed) {
				submitAction(result.value);
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
								Edit
							</button>
							<button className="event-button" onClick={() => handleDeleteUser(selectedUser?.ENumber)}>
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
							{filteredUsers.map((user, index) => (
								<tr
									className="vr_table-body-row"
									key={user.idx}
									onClick={() => handleRowClick(user, index)}
									style={{ cursor: isEditMode ? "pointer" : "default" }}
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
