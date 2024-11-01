import React, { useState, useEffect } from "react";
import Nav from "../navbar/navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash, faSearch } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import axios from "axios";

function Building() {
	const columns = ["รหัสชั้น", "ชื่อตึก", "จำนวนชั้น"];
	const [buildingName, setBuildingName] = useState("");
	const [floorCount, setFloorCount] = useState(1);
	const [selectedBuildingId, setSelectedBuildingId] = useState(null);
	const [isEditMode, setIsEditMode] = useState(false);
	const [buildingList, setBuildingList] = useState([]);

	useEffect(() => {
		fetchBuildings();
	}, []);

	const fetchBuildings = async () => {
		try {
			const response = await axios.get('http://localhost:8080/api/getbuilding');
			setBuildingList(response.data);
			console.log(response.data);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	const AddBuilding = () => {
		Swal.fire({
			title: 'Manage Building',
			html: `
				<form id="manage-building-form" class="popup-form">
					<div class="form-row">
						<div class="form-column">
							<label>ชื่อตึก</label>
							<input type="text" name="BuildingName" class="swal2-input-building" required />
						</div>
						<div class="form-column">
							<label>จำนวนชั้น</label>
							<label></label>
							<input type="number" name="FloorCount" class="swal2-select" required min="1" max="100" />
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
				const form = document.getElementById('manage-building-form');
				const formData = new FormData(form);
				return {
					Name: formData.get('BuildingName'),
					Floornum: formData.get('FloorCount'),
				};
			}
		}).then((result) => {
			if (result.isConfirmed) {
				addBuilding(result.value);
				fetchBuildings();
			}
		});
	};

	const addBuilding = async (buildingData) => {
		try {
			console.log(buildingData);
			await axios.post('http://localhost:8080/api/addbuilding', {
				Name: buildingData.Name,
				Floornum: buildingData.Floornum
			});
			fetchBuildings();
		} catch (error) {
			console.error("Error adding building:", error);
		}
	};

	const handleRowClick = (building) => {
		if (isEditMode) {
			setSelectedBuildingId(building.ID);
			editBuilding(building);
		} else {
			setSelectedBuildingId(building.ID);
		}
	};

	const editBuilding = (building) => {
		Swal.fire({
			title: 'Manage Building',
			html: `
                <form id="manage-edit-building-form" class="popup-form">
                    <div class="form-row">
                        <div class="form-column">
                            <label>ชื่อตึก</label>
                            <input type="text" name="BuildingName" class="swal2-input-building" required value="${building.Name}" />
                        </div>
                        <div class="form-column">
                            <label>จำนวนชั้น</label>
                            <input type="number" name="FloorCount" class="swal2-select" required value="${building.FloorCount}" min="1" max="100" />
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
				const form = document.getElementById('manage-edit-building-form');
				const formData = new FormData(form);
				return {
					ID: building.ID,
					Name: formData.get('BuildingName'),
					Floornum: formData.get('FloorCount'),
				};
			}
		}).then((result) => {
			if (result.isConfirmed) {
				updateBuilding(result.value);
				setSelectedBuildingId(null);
			} else {
				setSelectedBuildingId(null);
			}
		});
	};

	const updateBuilding = async (updatedBuilding) => {
		try {
			await axios.put('http://localhost:8080/api/editbuilding', updatedBuilding);
			Swal.fire("สำเร็จ", "ข้อมูลถูกแก้ไขแล้ว", "success");
			fetchBuildings();
		} catch (error) {
			console.error("Error updating building:", error);
		}
	};

	const confirmDeleteBuilding = (buildingId) => {
		return Swal.fire({
			title: "ยืนยันการลบข้อมูล",
			text: "ข้อมูลที่ถูกลบจะไม่สามารถกู้คืนได้",
			icon: "warning",
			showCancelButton: true,
			confirmButtonText: "ยืนยัน",
			cancelButtonText: "ยกเลิก",
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
		}).then((result) => {
			return result.isConfirmed; // Return true if confirmed
		});
	};

	const Delete = async () => {
		if (selectedBuildingId) {
			const isConfirmed = await confirmDeleteBuilding(selectedBuildingId);
			if (isConfirmed) {
				await handleDeleteBuilding(selectedBuildingId);
			}
		} else {
			Swal.fire("ข้อผิดพลาด", "กรุณาเลือกตึกที่ต้องการลบ", "error");
		}
	};

	const handleDeleteBuilding = async (buildingId) => {
		try {
			await axios.delete('http://localhost:8080/api/delbuilding', { data: { ID: buildingId } });
			Swal.fire("สำเร็จ", "ข้อมูลถูกลบแล้ว", "success");
			fetchBuildings();
			setSelectedBuildingId(null);
		} catch (error) {
			console.error("Error deleting building:", error);
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
							<button className="event-button" onClick={AddBuilding}>
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
							{buildingList.map((building, index) => (
								<tr
									className="vr_table-body-row"
									key={building.ID}
									onClick={() => handleRowClick(building)}
									style={{ cursor: isEditMode ? "pointer" : "default" }}
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
