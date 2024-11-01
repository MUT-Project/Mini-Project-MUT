import React, { useState, useEffect } from "react";
import Nav from "../navbar/navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash, faSearch } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import axios from "axios";

function Building() {
	const columns = ["รหัสชั้น", "ชื่อตึก", "จำนวนชั้น"];
	const [buildingList, setBuildingList] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedBuildingId, setSelectedBuildingId] = useState(null);
	const [mode, setMode] = useState(null); // To manage edit or delete mode

	useEffect(() => {
		fetchBuildings();
	}, []);

	const fetchBuildings = async () => {
		try {
			const response = await axios.get('http://localhost:8080/api/getbuilding');
			setBuildingList(response.data);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	const openBuildingPopup = (title, submitAction, buildingData = {}) => {
		Swal.fire({
			title: title,
			html: `
				<form id="manage-building-form" class="popup-form">
					<div class="form-row">
						<div class="form-column">
							<label>ชื่อตึก</label>
							<input type="text" name="BuildingName" class="swal2-input" value="${buildingData.Name || ''}" required />
						</div>
						<div class="form-column">
							<label>จำนวนชั้น</label>
							<input type="number" name="FloorCount" class="swal2-select" value="${buildingData.Floornum || 1}" required min="1" max="100" />
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
				const form = document.getElementById('manage-building-form');
				const formData = new FormData(form);
				return {
					ID: buildingData.ID,
					Name: formData.get('BuildingName'),
					Floornum: formData.get('FloorCount'),
				};
			}
		}).then((result) => {
			if (result.isConfirmed) {
				submitAction(result.value);
			}
		});
	};

	const handleAddBuilding = () => {
		openBuildingPopup("Manage Building", submitAddBuilding);
	};

	const handleEditBuilding = (building) => {
		setSelectedBuildingId(building.ID);
		openBuildingPopup("Edit Building", submitEditBuilding, building);
	};

	const submitAddBuilding = async (buildingData) => {
		try {
			await axios.post('http://localhost:8080/api/addbuilding', {
				Name: buildingData.Name,
				Floornum: buildingData.Floornum
			});
			Swal.fire("สำเร็จ", "ข้อมูลถูกเพิ่มแล้ว", "success");
			fetchBuildings();
		} catch (error) {
			console.error("Error adding building:", error);
		}
	};

	const submitEditBuilding = async (buildingData) => {
		try {
			await axios.put('http://localhost:8080/api/editbuilding', buildingData);
			Swal.fire("สำเร็จ", "ข้อมูลถูกแก้ไขแล้ว", "success");
			fetchBuildings();
			setSelectedBuildingId(null);
		} catch (error) {
			console.error("Error updating building:", error);
		}
	};

	const handleDeleteBuilding = async (buildingId) => {
		if (!buildingId) {
			Swal.fire("ข้อผิดพลาด", "กรุณาเลือกตึกที่ต้องการลบ", "error");
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
				await axios.delete('http://localhost:8080/api/delbuilding', { data: { ID: buildingId } });
				Swal.fire("สำเร็จ", "ข้อมูลถูกลบแล้ว", "success");
				fetchBuildings();
				setSelectedBuildingId(null);
			} catch (error) {
				console.error("Error deleting building:", error);
			}
		}
	};

	const filteredBuildings = buildingList.filter(building =>
		building.Name.includes(searchTerm)
	);

	const handleRowClick = (building) => {
		if (mode === "edit") {
			handleEditBuilding(building);
		} else if (mode === "delete") {
			handleDeleteBuilding(building.ID);
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
							<button name="Add" className="event-button" onClick={handleAddBuilding}>
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
							{filteredBuildings.map((building) => (
								<tr
									className="vr_table-body-row"
									key={building.ID}
									onClick={() => handleRowClick(building)}
									style={{ cursor: mode ? "pointer" : "default" }}
								>
									<td>{building.ID}</td>
									<td>{building.Name}</td>
									<td>{building.Floornum}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
}

export default Building;
