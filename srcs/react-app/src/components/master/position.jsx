import React, { useState, useEffect } from "react";
import Nav from "../navbar/navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faSearch } from '@fortawesome/free-solid-svg-icons';
import Swal from "sweetalert2";
import axios from 'axios';

function Position() {
	const columns = ["รหัสตำแหน่ง", "ชื่อตำแหน่ง", "สิทธิ์การเข้าใช้"];
	const [positionName, setPositionName] = useState("");
	const [selectedPositionId, setSelectedPositionId] = useState(null);
	const [isEditMode, setIsEditMode] = useState(false);
	const [permissions, setPermissions] = useState({
		book: false,
		manage: false,
		basicInfo: false,
		checkHistory: false,
		report: false,
		approveRoom: false,
	});
	const [positionList, setPositionList] = useState([]);

	useEffect(() => {
		fetchPositions();
	}, []);

	const fetchPositions = async () => {
		try {
			const response = await axios.get('http://localhost:8080/api/getposition');
			setPositionList(response.data);
		} catch (error) {
			console.error("Error fetching positions:", error);
		}
	};

	const AddPosition = () => {
		Swal.fire({
			title: 'Manage Position',
			html: `
				<form id="manage-position-form" class="popup-form">
					<div class="form-row">
						<div class="form-column">
							<label>ชื่อตำแหน่ง</label>
							<input type="text" name="PositionName" class="swal2-input-depart" required />
						</div>
					</div>
					<div class="form-row"></div>
					<div class="form-row">
						<div class="form-column">
							<label>สิทธิ์การเข้าใช้:</label>
						</div>
						<div class="form-column">
							<input type="checkbox" name="book" value="1">
							<label>การจอง</label>
						</div>
						<div class="form-column">
							<input type="checkbox" name="checkHistory" value="1">
							<label>เช็คประวัติ</label>
						</div>
					</div>
					<div class="form-row">
						<div class="form-column"></div>
						<div class="form-column">
							<input type="checkbox" name="manage" value="1">
							<label>การจัดการ</label>
						</div>
						<div class="form-column">
							<input type="checkbox" name="basicInfo" value="1">
							<label>ข้อมูลพื้นฐาน</label>
						</div>
					</div>
					<div class="form-row">
						<div class="form-column"></div>
						<div class="form-column">
							<input type="checkbox" name="report" value="1">
							<label>รายงาน</label>
						</div>
						<div class="form-column">
							<input type="checkbox" name="approveRoom" value="1">
							<label>อนุมัติห้อง</label>
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
				const form = document.getElementById('manage-position-form');
				const formData = new FormData(form);
				const positionName = formData.get('PositionName');
				const permissions = [
					formData.get('book') ? '1' : '0',
					formData.get('checkHistory') ? '1' : '0',
					formData.get('manage') ? '1' : '0',
					formData.get('basicInfo') ? '1' : '0',
					formData.get('report') ? '1' : '0',
					formData.get('approveRoom') ? '1' : '0'
				].join('');
				return { PositionName: positionName, permissions };
			}
		}).then((result) => {
			if (result.isConfirmed) {
				addPosition(result.value);
				setSelectedPositionId(null);
			} else {
				setSelectedPositionId(null);
			}
		});
	};

	const addPosition = async (newPosition) => {
		try {
			await axios.post('http://localhost:8080/api/addposition', {
				Name: newPosition.PositionName,
				Accessno: newPosition.permissions
			});
			Swal.fire("สำเร็จ", "ข้อมูลถูกเพิ่มแล้ว", "success");
			fetchPositions();
		} catch (error) {
			console.error("Error adding position:", error);
		}
	};

	const handleRowClick = (position) => {
		if (isEditMode) {
			setSelectedPositionId(position.ID);
			editPosition(position);
		} else {
			setSelectedPositionId(position.ID);
		}
	};

	const editPosition = (position) => {
		Swal.fire({
			title: 'Manage Position',
			html: `
				<form id="manage-edit-position-form" class="popup-form">
					<div class="form-row">
						<div class="form-column">
							<label>ชื่อตำแหน่ง</label>
							<input type="text" name="PositionName" class="swal2-input-depart" required value="${position.Name}" />
						</div>
					</div>
					<div class="form-row"></div>
					<div class="form-row">
						<div class="form-column">
							<label>สิทธิ์การเข้าใช้\t:</label>
						</div>
						<div class="form-column">
							<input type="checkbox" name="book" ${position.Accessno[0] === "1" ? "checked" : ""} value="1">
							<label>การจอง</label>
						</div>
						<div class="form-column">
							<input type="checkbox" name="checkHistory" ${position.Accessno[1] === "1" ? "checked" : ""} value="1">
							<label>เช็คประวัติ</label>
						</div>
					</div>
					<div class="form-row">
						<div class="form-column">
						</div>
						<div class="form-column">
							<input type="checkbox" name="manage" ${position.Accessno[2] === "1" ? "checked" : ""} value="1">
							<label>การจัดการ</label>
						</div>
						<div class="form-column">
							<input type="checkbox" name="basicInfo" ${position.Accessno[3] === "1" ? "checked" : ""} value="1">
							<label>ข้อมูลพื้นฐาน</label>
						</div>
					</div>
					<div class="form-row">
						<div class="form-column">
						</div>
						<div class="form-column">
							<input type="checkbox" name="report" ${position.Accessno[4] === "1" ? "checked" : ""} value="1">
							<label>รายงาน</label>
						</div>
						<div class="form-column">
							<input type="checkbox" name="approveRoom" ${position.Accessno[5] === "1" ? "checked" : ""} value="1">
							<label>อนุมัติห้อง</label>
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
				const form = document.getElementById('manage-edit-position-form');
				const formData = new FormData(form);
				const positionName = formData.get('PositionName');
	
				const permissions = [
					formData.get('book') ? '1' : '0',
					formData.get('checkHistory') ? '1' : '0',
					formData.get('manage') ? '1' : '0',
					formData.get('basicInfo') ? '1' : '0',
					formData.get('report') ? '1' : '0',
					formData.get('approveRoom') ? '1' : '0'
				].join('');
	
				return { ID: position.ID, Name: positionName, Accessno: permissions };
			}
		}).then((result) => {
			if (result.isConfirmed) {
				updatePosition(result.value);
				setSelectedPositionId(null);
			} else {
				setSelectedPositionId(null);
			}
		});
	};
	const updatePosition = async (updatedPosition) => {
		try {
			await axios.put('http://localhost:8080/api/editposition', { ID : updatedPosition.ID, Name : updatedPosition.Name, Accessno : updatedPosition.Accessno });
			Swal.fire("สำเร็จ", "ข้อมูลถูกแก้ไขแล้ว", "success");
			fetchPositions();
		} catch (error) {
			console.error("Error updating position:", error);
		}
	};

	const confirmDeletePosition = (positionId) => {
		return Swal.fire({
			title: "ยืนยันการลบข้อมูล",
			text: "ข้อมูลที่ถูกลบจะไม่สามารถกู้คืนได้",
			icon: "warning",
			showCancelButton: true,
			confirmButtonText: "ยืนยัน",
			cancelButtonText: "ยกเลิก",
		}).then((result) => {
			return result.isConfirmed; // Return true if confirmed
		});
	};

	const Delete = async () => {
		if (selectedPositionId) {
			const isConfirmed = await confirmDeletePosition(selectedPositionId);
			if (isConfirmed) {
				await handleDeletePosition(selectedPositionId);
			}
		} else {
			Swal.fire("ข้อผิดพลาด", "กรุณาเลือกตำแหน่งที่ต้องการลบ", "error");
		}
	};

	const handleDeletePosition = async (positionId) => {
		try {
			await axios.delete('http://localhost:8080/api/delposition', { data: { ID: positionId } });
			Swal.fire("สำเร็จ", "ข้อมูลถูกลบแล้ว", "success");
			fetchPositions();
			setSelectedPositionId(null);
		} catch (error) {
			console.error("Error deleting position:", error);
		}
	};

	return (
		<>
			<Nav />
			<div className="vr_select-background">
				<div className="header-room"></div>
				<div className="table-zone">
					<div className="event-zone">
						<div className="vr_action-buttons">
							<button className="event-button" onClick={AddPosition}>
								<FontAwesomeIcon icon={faPlus} className="button-icon" />
								Add
							</button>
							<button className="event-button" onClick={() => { setIsEditMode(!isEditMode) }}>
								<FontAwesomeIcon icon={faEdit} className="button-icon" />
								{isEditMode ? 'Cancel Edit' : 'Edit'}
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
							{positionList.map((position) => (
								<tr
									className="vr_table-body-row"
									key={position.ID}
									onClick={() => handleRowClick(position)}
									style={{ cursor: isEditMode ? "pointer" : "default" }}
								>
									<td>{position.ID}</td>
									<td>{position.Name}</td>
									<td>{position.Accessno}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
}

export default Position;
