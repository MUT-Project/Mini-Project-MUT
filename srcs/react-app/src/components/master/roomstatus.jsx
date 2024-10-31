import React, { useState, useEffect } from "react";
import Nav from "../navbar/navbar";
import Swal from "sweetalert2";
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesome
import { faPlus, faEdit, faTrash, faSearch } from "@fortawesome/free-solid-svg-icons"; // Import specific icons

function Status() {
	const columns = ["รหัสสถานะ", "สถานะห้อง"]; // Table columns
	const [statusName, setStatusName] = useState("");
	const [selectedStatusId, setSelectedStatusId] = useState(null);
	const [isEditMode, setIsEditMode] = useState(false);
	const [statusList, setStatusList] = useState([]);

	// Fetch status data on mount
	useEffect(() => {
		fetchStatus();
	}, []);

	const fetchStatus = async () => {
		try {
			const response = await axios.get('http://localhost:8080/api/getroomstatus');
			setStatusList(response.data);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	const AddStatus = () => {
		Swal.fire({
			title: 'Manage RoomStatus',
			html: `
				<form id="manage-room-form" class="popup-form">
					<div class="form-row">
						<div class="form-column">
							<label>สถานะห้อง</label>
							<input type="text" name="RoomStatus" class="swal2-input-depart" required />
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
				const formData = new FormData(form);
				return formData.get('RoomStatus');
			}
		}).then((result) => {
			if (result.isConfirmed && result.value) {
				const newStatusName = result.value;
				setStatusName(newStatusName);
				addStatus(newStatusName);
			}
		});
	};

	const addStatus = async (name) => {
		try {
			await axios.post('http://localhost:8080/api/addroom-status', { Name: name });
			fetchStatus();
			Swal.fire("สำเร็จ", "ข้อมูลถูกเพิ่มแล้ว", "success");
		} catch (error) {
			console.error("Error adding status:", error);
		}
	};

	const handleRowClick = (status) => {
		if (isEditMode) {
			setSelectedStatusId(status.ID);
			editStatus(status);
		} else {
			setSelectedStatusId(status.ID);
		}
	};

	const editStatus = (status) => {
		Swal.fire({
			title: 'Manage RoomStatus',
			html: `
                <form id="manage-edit-room-form" class="popup-form">
                    <div class="form-row">
                        <div class="form-column">
                            <label>สถานะห้อง</label>
                            <input type="text" name="RoomStatus" class="swal2-input-depart" required value="${status.Name}" />
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
				const form = document.getElementById('manage-edit-room-form');
				const formData = new FormData(form);
				return {
					ID: status.ID,
					Name: formData.get('RoomStatus'),
				};
			}
		}).then((result) => {
			if (result.isConfirmed) {
				updateStatus(result.value);
				setSelectedStatusId(null);
			}
			else {
				setSelectedStatusId(null);
			}
		});
	};

	const updateStatus = async (updatedStatus) => {
		try {
			await axios.put('http://localhost:8080/api/editroom-status', updatedStatus);
			Swal.fire("สำเร็จ", "ข้อมูลถูกแก้ไขแล้ว", "success");
			fetchStatus();
		} catch (error) {
			console.error("Error updating status:", error);
		}
	};

	const confirmDeleteStatus = (statusId) => {
		return Swal.fire({
			title: "ยืนยันการลบข้อมูล",
			text: "ข้อมูลที่ถูกลบจะไม่สามารถกู้คืนได้",
			icon: "warning",
			showCancelButton: true,
			confirmButtonText: "ยืนยัน",
			cancelButtonText: "ยกเลิก",
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
		}).then((result) => result.isConfirmed);
	};

	const Delete = async () => {
		if (selectedStatusId) {
			const isConfirmed = await confirmDeleteStatus(selectedStatusId);
			if (isConfirmed) {
				await handleDeleteStatus(selectedStatusId);
			}
		} else {
			Swal.fire("ข้อผิดพลาด", "กรุณาเลือกสถานะที่ต้องการลบ", "error");
		}
	};

	const handleDeleteStatus = async (statusId) => {
		try {
			await axios.delete('http://localhost:8080/api/delroom-status', { data: { ID: statusId } });
			Swal.fire("สำเร็จ", "ข้อมูลถูกลบแล้ว", "success");
			fetchStatus();
			setSelectedStatusId(null);
		} catch (error) {
			console.error("Error deleting status:", error);
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
							<button className="event-button" onClick={AddStatus}>
								<FontAwesomeIcon icon={faPlus} className="button-icon" />
								Add
							</button>
							<button className="event-button" onClick={() => setIsEditMode(!isEditMode)}>
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
							{statusList.map((status) => (
								<tr
									className="vr_table-body-row"
									key={status.ID}
									onClick={() => handleRowClick(status)}
									style={{ cursor: isEditMode ? "pointer" : "default" }}
								>
									<td>{status.ID}</td>
									<td>{status.Name}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
}

export default Status;