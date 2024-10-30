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
	const [selectedRoom, setSelectedRoom] = useState(null);
	const [formData, setFormData] = useState({
		rnumber: '',
		rname: '',
		bname: '',
		flname: '',
		sname: '',
		vip: '',
		capacity: ''
	});

	useEffect(() => {
		fetchRooms();
	}, []);

	const fetchRooms = async () => {
		try {
			const response = await axios.get("http://localhost:8080/api/getrooms");
			setRooms(response.data);
		} catch (error) {
			console.error("Error fetching rooms:", error);
		}
	};

	const deleteRoom = async (roomNumber) => {
		const result = await Swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Yes, delete it!'
		});
		if (result.isConfirmed) {
			try {
				await axios.delete(`http://localhost:8080/api/deleterooms/${roomNumber}`);
				Swal.fire('Deleted!', 'Your room has been deleted.', 'success');
				fetchRooms();
			} catch (error) {
				console.error("Error deleting room:", error);
				Swal.fire("Error", "Could not delete room.", "error");
			}
		}
	};

	const submitPopup = async () => {
		try {
			await axios.post("http://localhost:8080/api/addrooms", formData);
			Swal.fire("Success", "Room added successfully!", "success");
			fetchRooms();
			resetForm();
		} catch (error) {
			console.error("Error adding room:", error);
			Swal.fire("Error", "Could not add room.", "error");
		}
	};

	const editPopup = async () => {
		try {
			await axios.put("http://localhost:8080/api/editrooms", { ...formData, rnumber: selectedRoom });
			Swal.fire("Success", "Room edited successfully!", "success");
			fetchRooms();
			resetForm();
		} catch (error) {
			console.error("Error editing room:", error);
			Swal.fire("Error", "Could not edit room.", "error");
		}
	};

	const openPopup = () => {
		resetForm();
	};

	const resetForm = () => {
		setSelectedRoom(null);
		setFormData({
			rnumber: '',
			rname: '',
			bname: '',
			flname: '',
			sname: '',
			vip: '',
			capacity: ''
		});
	};

	const handleEditClick = (room) => {
		setSelectedRoom(room.rnumber);
		setFormData({
			rnumber: room.rnumber,
			rname: room.rname,
			bname: room.bname,
			flname: room.flname,
			sname: room.sname,
			vip: room.vip,
			capacity: room.capacity
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
							<button className="event-button" onClick={selectedRoom ? editPopup : null} disabled={!selectedRoom}>
								<FontAwesomeIcon icon={faEdit} className="button-icon" />
								Edit
							</button>
							<button className="event-button" onClick={() => deleteRoom(selectedRoom)} disabled={!selectedRoom}>
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
							{rooms.map((room) => (
								<tr key={room.rnumber} className="vr_table-body-row" onClick={() => handleEditClick(room)}>
									<td className="vr_table-cell">{room.rnumber}</td>
									<td className="vr_table-cell">{room.rname}</td>
									<td className="vr_table-cell">{room.bname}</td>
									<td className="vr_table-cell">{room.flname}</td>
									<td className="vr_table-cell">{room.sname}</td>
									<td className="vr_table-cell">{room.vip}</td>
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
