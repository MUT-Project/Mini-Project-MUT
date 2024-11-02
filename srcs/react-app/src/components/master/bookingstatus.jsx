import React, { useState, useEffect } from "react";
import Nav from "../navbar/navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash, faSearch } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import axios from 'axios';

function Status() {
	const columns = ["รหัสสถานะ", "สถานะการจอง"];
	const [statusList, setStatusList] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedStatusId, setSelectedStatusId] = useState(null);
	const [mode, setMode] = useState(null); // ใช้เพื่อจัดการโหมดการแก้ไขหรือลบ

	useEffect(() => {
		fetchBookingStatus();
	}, []);

	const fetchBookingStatus = async () => {
		try {
			const response = await axios.get('http://localhost:8080/api/getbookingstatus');
			setStatusList(response.data);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	const openStatusPopup = (title, submitAction, statusData = {}) => {
		Swal.fire({
			title: title,
			html: `
                <form id="manage-status-form" class="popup-form">
                    <div class="form-row">
                        <div class="form-column">
                            <label>สถานะการจอง</label>
                            <input type="text" name="BookingStatus" class="swal2-input" value="${statusData.Name || ''}" required />
                        </div>
                    </div>
                </form>
            `,
			focusConfirm: false,
			showCancelButton: true,
			confirmButtonText: title.includes("Edit") ? 'แก้ไข' : 'เพิ่ม',
			cancelButtonText: 'ยกเลิก',
			//reverseButtons: true,
			preConfirm: () => {
				const form = document.getElementById('manage-status-form');
				const formData = new FormData(form);
				return { ID: statusData.ID, Name: formData.get('BookingStatus') };
			}
		}).then((result) => {
			if (result.isConfirmed) {
				submitAction(result.value);
			}
		});
	};

	const handleAddStatus = () => {
		openStatusPopup("Manage Booking Status", submitAddStatus);
	};

	const handleEditStatus = (status) => {
		setSelectedStatusId(status.ID);
		openStatusPopup("Edit Booking Status", submitEditStatus, status);
	};

	const submitAddStatus = async (statusData) => {
		try {
			await axios.post('http://localhost:8080/api/addbooking-status', { Name: statusData.Name });
			Swal.fire("สำเร็จ", "ข้อมูลถูกเพิ่มแล้ว", "success");
			fetchBookingStatus();
		} catch (error) {
			console.error("Error adding status:", error);
		}
	};

	const submitEditStatus = async (statusData) => {
		try {
			await axios.put('http://localhost:8080/api/editbooking-status', statusData);
			Swal.fire("สำเร็จ", "ข้อมูลถูกแก้ไขแล้ว", "success");
			fetchBookingStatus();
			setSelectedStatusId(null);
		} catch (error) {
			console.error("Error updating status:", error);
		}
	};

	const handleDeleteStatus = async (statusId) => {
		if (!statusId) {
			Swal.fire("ข้อผิดพลาด", "กรุณาเลือกสถานะที่ต้องการลบ", "error");
			return;
		}

		const isConfirmed = await Swal.fire({
			title: "ยืนยันการลบข้อมูล",
			text: "ข้อมูลที่ถูกลบจะไม่สามารถกู้คืนได้",
			icon: "warning",
			showCancelButton: true,
			confirmButtonText: "ยืนยัน",
			cancelButtonText: "ยกเลิก"
		}).then((result) => result.isConfirmed);

		if (isConfirmed) {
			try {
				await axios.delete('http://localhost:8080/api/delbooking-status', { data: { ID: statusId } });
				Swal.fire("สำเร็จ", "ข้อมูลถูกลบแล้ว", "success");
				fetchBookingStatus();
				setSelectedStatusId(null);
			} catch (error) {
				console.error("Error deleting status:", error);
			}
		}
	};

	const filteredStatuses = statusList.filter(status =>
		status.Name.includes(searchTerm)
	);

	const handleRowClick = (status) => {
		if (mode === "edit") {
			handleEditStatus(status);
		} else if (mode === "delete") {
			handleDeleteStatus(status.ID);
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
							<button name="Add" className="event-button" onClick={handleAddStatus}>
								<FontAwesomeIcon icon={faPlus} className="button-icon" />
								Add
							</button>
							<button name="Edit" className="event-button" onClick={() => setMode(mode === "edit" ? null : "edit")}>
								<FontAwesomeIcon icon={faEdit} className="button-icon" />
								{mode === "edit" ? 'Cancel Edit' : 'Edit'}
							</button>
							<button name="Delete" className="event-button" onClick={() => setMode(mode === "delete" ? null : "delete")}>
								<FontAwesomeIcon icon={faTrash} className="button-icon" />
								{mode === "delete" ? 'Cancel Delete' : 'Delete'}
							</button>
						</div>
						<div className="search-container">
							<input className="input-text" type="text" placeholder="Search..." onChange={(e) => setSearchTerm(e.target.value)} />
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
							{filteredStatuses.map((status) => (
								<tr
									className="vr_table-body-row"
									key={status.ID}
									onClick={() => handleRowClick(status)}
									style={{ cursor: mode ? "pointer" : "default" }}
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
