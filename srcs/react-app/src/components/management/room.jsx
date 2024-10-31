import React, { useEffect, useState } from "react";
import Nav from "../navbar/navbar";
import "./style_management.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faSearch } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import axios from 'axios';

function Room() {
	const columns = [
		"รหัสห้อง",
		"ชื่อห้อง",
		"รหัสตึก",
		"ชั้น",
		"สถานะ",
		"ระดับห้อง",
		"ความจุ"
	];

	const [rooms, setRooms] = useState([]);
	const [statuses, setStatuses] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedRoom, setSelectedRoom] = useState(null);
	const [mode, setMode] = useState(null);

	useEffect(() => {
		fetchRooms();
		fetchStatuses();
	}, []);

	const fetchRooms = async () => {
		try {
			const response = await axios.get("http://localhost:8080/api/getrooms");
			console.log(response.data);
			if (Array.isArray(response.data)) {
				setRooms(response.data);
			} else {
				console.error("Expected an array but got:", response.data);
				setRooms([]);
			}
		} catch (error) {
			Swal.fire("ข้อผิดพลาด", error.response?.data?.error || "เกิดข้อผิดพลาดในการเพิ่มห้อง", "error");
			console.error("Error fetching rooms:", error);
		}
	};

	const fetchStatuses = async () => {
		try {
			const response = await axios.get("http://localhost:8080/api/getempstatus");
			setStatuses(response.data);
		} catch (error) {
			console.error("Error fetching statuses:", error);
		}
	};

	const openRoomPopup = (title, submitAction, roomData = {}) => {
		Swal.fire({
			title: title,
			html: `
				<form id="manage-room-form" class="popup-form">
					<div class="form-row">
						<div class="form-column">
							<label>ชื่อห้อง</label>
							<input type="text" name="rname" class="swal2-input" value="${roomData.rname || ''}" required />
						</div>
						<div class="form-column">
							<label>รหัสตึก</label>
							<input type="text" name="bname" class="swal2-input" value="${roomData.bname || ''}" required />
						</div>
					</div>
					<div class="form-row">
						<div class="form-column">
							<label>ชั้น</label>
							<input type="text" name="flname" class="swal2-input" value="${roomData.flname || ''}" required />
						</div>
						<div class="form-column">
							<label>สถานะ</label>
							<select name="SName" class="swal2-select" required>
								<option value=""></option>
								${statuses.map(statuses => `<option value="${statuses.sname}">${statuses.sname}</option>`).join('')}
							</select>
						</div>
					</div>
					<div class="form-row">
						<div class="form-column">
							<label>ระดับห้อง</label>
							<select name="vip" class="swal2-select" required>
								<option value="${roomData.vip || ''}" selected>${roomData.vip || ''}</option>
								<option value="0">Standard</option>
								<option value="1">VIP</option>
							</select>
						</div>
						<div class="form-column">
							<label>ความจุ</label>
							<input type="number" name="capacity" class="swal2-input" value="${roomData.capacity || ''}" required />
						</div>
					</div>
				</form>
			`,
			focusConfirm: false,
			showCancelButton: true,
			confirmButtonText: 'เพิ่ม',
			cancelButtonText: 'ยกเลิก',
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

	const handleAddRoom = () => {
		setSelectedRoom(null);
		setMode(null);
		openRoomPopup("Add Room", submitAddRoom);
	};

	const handleEditRoom = (room) => {
		setSelectedRoom(room.rnumber);
		openRoomPopup("Edit Room", submitEditRoom, room);
	};

	const handleDeleteRoom = async (roomId) => {
		if (!roomId) {
			Swal.fire("ข้อผิดพลาด", "กรุณาเลือกห้องที่ต้องการลบ", "error");
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
		}).then(async (result) => {
			if (result.isConfirmed) {
				try {
					console.log("Deleting room with ID:", roomId);
					const response = await axios.delete("http://localhost:8080/api/delrooms", {
						data: { RNumber: roomId }
					});

					console.log("Delete response:", response.data);
					Swal.fire("สำเร็จ", "ข้อมูลห้องถูกลบแล้ว", "success");
					fetchRooms();
					setSelectedRoom(null);
					setMode(null);
				} catch (error) {
					console.error("Error deleting room:", error);
					Swal.fire("ข้อผิดพลาด", error.response?.data?.error || "เกิดข้อผิดพลาดในการลบห้อง", "error");
				}
			}
		});
	};

	const submitAddRoom = async (roomData) => {
		try {
			await axios.post("http://localhost:8080/api/addrooms", roomData);
			Swal.fire("สำเร็จ", "ห้องถูกเพิ่มแล้ว", "success");
			fetchRooms();
		} catch (error) {
			Swal.fire("ข้อผิดพลาด", error.response?.data?.error || "เกิดข้อผิดพลาดในการเพิ่มห้อง", "error");
			console.error("Error adding room:", error);
		}
	};

	const submitEditRoom = async (roomData) => {
		if (!selectedRoom) {
			Swal.fire("ข้อผิดพลาด", "ไม่พบข้อมูลห้องที่ต้องการแก้ไข", "error");
			return;
		}
		try {
			await axios.put("http://localhost:8080/api/editrooms", { ...roomData, rnumber: selectedRoom });
			Swal.fire("สำเร็จ", "ข้อมูลห้องถูกแก้ไขแล้ว", "success");
			fetchRooms();
		} catch (error) {
			Swal.fire("ข้อผิดพลาด", "เกิดข้อผิดพลาดในการแก้ไขข้อมูลห้อง", "error");
			console.error("Error editing room:", error);
		}
	};

	const handleRowClick = (room) => {
		if (mode === "edit") {
			handleEditRoom(room);
		} else if (mode === "delete") {
			handleDeleteRoom(room.rnumber);
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
							<button name="Add" className="event-button" onClick={handleAddRoom}>
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
							{rooms.map((room) => (
								<tr
									className="vr_table-body-row"
									key={room.rnumber}
									onClick={() => handleRowClick(room)}
									style={{ cursor: mode ? "pointer" : "default" }}
								>
									<td className="vr_table-cell">{room.rnumber}</td>
									<td className="vr_table-cell">{room.rname}</td>
									<td className="vr_table-cell">{room.bname}</td>
									<td className="vr_table-cell">{room.flname}</td>
									<td className="vr_table-cell">{room.sname}</td>
									<td className="vr_table-cell">{room.vip === "1" ? "VIP" : "Normal"}</td>
									<td className="vr_table-cell">{room.capacity}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
}

export default Room;
