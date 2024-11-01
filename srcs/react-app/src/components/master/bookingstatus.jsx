import React, { useState, useEffect } from "react";
import Nav from "../navbar/navbar";
import Swal from "sweetalert2";
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faPlus, faEdit, faTrash, faSearch } from "@fortawesome/free-solid-svg-icons";

function Status() {
	const columns = ["รหัสสถานะ", "สถานะการจอง"];
	const [bookingStatus, setBookingStatus] = useState("");
	const [selectedStatusId, setSelectedStatusId] = useState(null);
	const [isEditMode, setIsEditMode] = useState(false);
	const [statusList, setStatusList] = useState([]);

	// Fetch booking statuses on mount
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

	const addBookingStatus = () => {
		Swal.fire({
			title: 'Manage Booking Status',
			html: `
				<form id="manage-booking-form" class="popup-form">
					<div class="form-row">
						<div class="form-column">
							<label>สถานะการจอง</label>
							<input type="text" name="BookingStatus" class="swal2-input" required />
						</div>
					</div>
				</form>
			`,
			showCancelButton: true,
			confirmButtonText: 'เพิ่ม',
			cancelButtonText: 'ยกเลิก',
			preConfirm: () => {
				const form = document.getElementById('manage-booking-form');
				const formData = new FormData(form);
				return formData.get('BookingStatus');
			}
		}).then((result) => {
			if (result.isConfirmed && result.value) {
				addStatus(result.value);
			}
		});
	};

	const addStatus = async (name) => {
		try {
			await axios.post('http://localhost:8080/api/addbooking-status', { Name: name });
			fetchBookingStatus();
			Swal.fire("สำเร็จ", "ข้อมูลถูกเพิ่มแล้ว", "success");
		} catch (error) {
			console.error("Error adding status:", error);
		}
	};

	const editBookingStatus = (status) => {
		Swal.fire({
			title: 'Manage Booking Status',
			html: `
                <form id="edit-booking-form" class="popup-form">
                    <div class="form-row">
                        <div class="form-column">
                            <label>สถานะการจอง</label>
                            <input type="text" name="BookingStatus" class="swal2-input" required value="${status.Name}" />
                        </div>
                    </div>
                </form>
            `,
			showCancelButton: true,
			confirmButtonText: 'แก้ไข',
			cancelButtonText: 'ยกเลิก',
			preConfirm: () => {
				const form = document.getElementById('edit-booking-form');
				const formData = new FormData(form);
				return { ID: status.ID, Name: formData.get('BookingStatus') };
			}
		}).then((result) => {
			if (result.isConfirmed) {
				updateStatus(result.value);
			}
		});
	};

	const updateStatus = async (updatedStatus) => {
		try {
			await axios.put('http://localhost:8080/api/editbooking-status', updatedStatus);
			Swal.fire("สำเร็จ", "ข้อมูลถูกแก้ไขแล้ว", "success");
			fetchBookingStatus();
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
		}).then((result) => result.isConfirmed);
	};

	const deleteStatus = async () => {
		if (selectedStatusId) {
			const isConfirmed = await confirmDeleteStatus(selectedStatusId);
			if (isConfirmed) {
				try {
					await axios.delete('http://localhost:8080/api/delbooking-status', { data: { ID: selectedStatusId } });
					Swal.fire("สำเร็จ", "ข้อมูลถูกลบแล้ว", "success");
					fetchBookingStatus();
					setSelectedStatusId(null);
				} catch (error) {
					console.error("Error deleting status:", error);
				}
			}
		} else {
			Swal.fire("ข้อผิดพลาด", "กรุณาเลือกสถานะที่ต้องการลบ", "error");
		}
	};

	const handleRowClick = (status) => {
		if (isEditMode) {
			editBookingStatus(status);
		} else {
			setSelectedStatusId(status.ID);
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
							<button className="event-button" onClick={addBookingStatus}>
								<FontAwesomeIcon icon={faPlus} className="button-icon" />
								Add
							</button>
							<button className="event-button" onClick={() => setIsEditMode(!isEditMode)}>
								<FontAwesomeIcon icon={faEdit} className="button-icon" />
								{isEditMode ? 'Cancel Edit' : 'Edit'}
							</button>
							<button className="event-button" onClick={deleteStatus}>
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
