import React, { useState, useEffect } from "react";
import Nav from "../navbar/navbar";
import Swal from "sweetalert2";
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash, faSearch } from "@fortawesome/free-solid-svg-icons";

function Status() {
	const columns = ["รหัสสถานะ", "สถานะพนักงาน"];
	const [statusList, setStatusList] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedStatusId, setSelectedStatusId] = useState(null);
	const [mode, setMode] = useState(null); // Manage edit or delete mode
	const [loading, setLoading] = useState(false); // Loading state
	const [error, setError] = useState(null); // Error state

	useEffect(() => {
		fetchStatus();
	}, []);

	const formatStatusData = (data) => {
		return data.map(status => ({
			ID: status.ID, // Ensure this matches the API response structure
			Name: status.Name || "Unknown" // Provide a default name if not present
		}));
	};
	

	const fetchStatus = async () => {
		setLoading(true);
		setError(null); // Reset error state before fetching
		try {
			const response = await axios.get('http://localhost:8080/api/getempstatus');
			console.log("Fetched data:", response.data); // Log the fetched data
			const formattedData = formatStatusData(response.data); // Format the fetched data
			setStatusList(formattedData); // Set the formatted data to state
		} catch (error) {
			setError("Error fetching data. Please try again.");
			console.error("Error fetching data:", error);
		} finally {
			setLoading(false);
		}
	};

	const openStatusPopup = (title, submitAction, statusData = {}) => {
		Swal.fire({
			title: title,
			html: `
                <form id="manage-status-form" class="popup-form">
                    <div class="form-row">
                        <div class="form-column">
                            <label>ชื่อสถานะ</label>
                            <input type="text" name="StatusName" class="swal2-input" value="${statusData.Name || ''}" required />
                        </div>
                    </div>
                </form>
            `,
			focusConfirm: false,
			showCancelButton: true,
			confirmButtonText: title.includes("Edit") ? 'แก้ไข' : 'เพิ่ม',
			cancelButtonText: 'ยกเลิก',
			preConfirm: () => {
				const form = document.getElementById('manage-status-form');
				const formData = new FormData(form);
				return { ID: statusData.ID, Name: formData.get('StatusName') };
			}
		}).then((result) => {
			if (result.isConfirmed) {
				submitAction(result.value);
			}
		});
	};

	const handleAddStatus = () => {
		openStatusPopup("Manage Status", submitAddStatus);
	};

	const handleEditStatus = (status) => {
		setSelectedStatusId(status.ID);
		openStatusPopup("Edit Status", submitEditStatus, status);
	};

	const submitAddStatus = async (statusData) => {
		setLoading(true);
		try {
			await axios.post('http://localhost:8080/api/addemp-status', { Name: statusData.Name });
			Swal.fire("สำเร็จ", "ข้อมูลถูกเพิ่มแล้ว", "success");
			fetchStatus();
		} catch (error) {
			setError("Error adding status. Please try again.");
			console.error("Error adding status:", error);
		} finally {
			setLoading(false);
		}
	};

	const submitEditStatus = async (statusData) => {
		setLoading(true);
		try {
			await axios.put('http://localhost:8080/api/editemp-status', statusData);
			Swal.fire("สำเร็จ", "ข้อมูลถูกแก้ไขแล้ว", "success");
			fetchStatus();
			setSelectedStatusId(null);
		} catch (error) {
			setError("Error updating status. Please try again.");
			console.error("Error updating status:", error);
		} finally {
			setLoading(false);
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

	const handleDeleteStatus = async (statusId) => {
		setLoading(true);
		try {
			await axios.delete('http://localhost:8080/api/delemp-status', { data: { ID: statusId } });
			Swal.fire("สำเร็จ", "ข้อมูลถูกลบแล้ว", "success");
			fetchStatus();
			setSelectedStatusId(null);
		} catch (error) {
			setError("Error deleting status. Please try again.");
			console.error("Error deleting status:", error);
		} finally {
			setLoading(false);
		}
	};

	const Delete = async () => {
		if (selectedStatusId) {
			const isConfirmed = await confirmDeleteStatus(selectedStatusId);
			if (isConfirmed) {
				handleDeleteStatus(selectedStatusId);
			}
		} else {
			Swal.fire("ข้อผิดพลาด", "กรุณาเลือกสถานะที่ต้องการลบ", "error");
		}
	};

	const filteredStatuses = statusList.filter(status => 
		status.Name && status.Name.includes(searchTerm)
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
								เพิ่ม
							</button>
							<button name="Edit" className="event-button" onClick={() => setMode(mode === "edit" ? null : "edit")}>
								<FontAwesomeIcon icon={faEdit} className="button-icon" />
								{mode === "edit" ? 'ยกเลิกการแก้ไข' : 'แก้ไข'}
							</button>
							<button name="Delete" className="event-button" onClick={() => setMode(mode === "delete" ? null : "delete")}>
								<FontAwesomeIcon icon={faTrash} className="button-icon" />
								{mode === "delete" ? 'ยกเลิกการลบ' : 'ลบ'}
							</button>
						</div>
						<div className="search-container">
							<input className="input-text" type="text" placeholder="ค้นหา..." onChange={(e) => setSearchTerm(e.target.value)} />
							<button className="input-pic">
								<FontAwesomeIcon icon={faSearch} className="search-icon" />
							</button>
						</div>
					</div>
					{loading ? (
						<p>Loading...</p>
					) : error ? (
						<p>{error}</p>
					) : (
						<table className="vr_table">
							<thead className="vr_table-head-row">
								<tr>{columns.map((col, idx) => <th className="vr_table-head-cell" key={idx}>{col}</th>)}</tr>
							</thead>
							<tbody>
								{filteredStatuses.length > 0 ? (
									filteredStatuses.map((status) => (
										<tr
											className="vr_table-body-row"
											key={status.ID}
											onClick={() => handleRowClick(status)}
											style={{ cursor: mode ? "pointer" : "default" }}
										>
											<td>{status.ID}</td>
											<td>{status.Name}</td>
										</tr>
									))
								) : (
									<tr><td colSpan={2}>No statuses found</td></tr>
								)}
							</tbody>
						</table>
					)}
				</div>
			</div>
		</>
	);
}

export default Status;
