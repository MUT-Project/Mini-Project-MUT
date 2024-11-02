import React, { useState, useEffect } from "react";
import Nav from "../navbar/navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faPlus,
	faEdit,
	faTrash,
	faSearch,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import axios from "axios";

function Department() {
	const columns = ["รหัสแผนก", "ชื่อแผนก"];
	const [departlist, setDepartlist] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedDepartmentId, setSelectedDepartmentId] = useState(null);
	const [mode, setMode] = useState(null); // Manage edit and delete modes

	useEffect(() => {
		fetchDepart();
	}, []);

	const fetchDepart = async () => {
		try {
			const response = await axios.get("http://localhost:8080/api/department");
			const formattedData = response.data.map(dept => ({
				ID: dept.dnumber,
				Name: dept.dname,
			}));
			setDepartlist(formattedData);
		} catch (error) {
			console.error("Error fetching departments:", error);
		}
	};

	const openDepartPopup = (title, submitAction, departmentData = {}) => {
		Swal.fire({
			title: title,
			html: `
                <form id="manage-depart-form" class="popup-form">
                    <div class="form-row">
                        <div class="form-column">
                            <label>ชื่อแผนก</label>
                            <input type="text" name="DepartName" class="swal2-input" value="${departmentData.Name || ""}" required />
                        </div>
                    </div>
                </form>
            `,
			focusConfirm: false,
			showCancelButton: true,
			confirmButtonText: title.includes("Edit") ? "แก้ไข" : "เพิ่ม",
			cancelButtonText: "ยกเลิก",
			preConfirm: () => {
				const form = document.getElementById("manage-depart-form");
				const formData = new FormData(form);
				return { ID: departmentData.ID, Name: formData.get("DepartName") };
			},
		}).then((result) => {
			if (result.isConfirmed) {
				submitAction(result.value);
			}
		});
	};

	const handleAddDepartment = () => {
		openDepartPopup("Manage Department", submitAddDepartment);
	};

	const handleEditDepartment = (department) => {
		openDepartPopup("Edit Department", submitEditDepartment, department);
	};

	const submitAddDepartment = async (departmentData) => {
		try {
			await axios.post("http://localhost:8080/api/adddepartment", {
				Name: departmentData.Name,
			});
			Swal.fire("สำเร็จ", "ข้อมูลถูกเพิ่มแล้ว", "success");
			fetchDepart();
		} catch (error) {
			console.error("Error adding department:", error);
		}
	};

	const submitEditDepartment = async (departmentData) => {
		try {
			await axios.put("http://localhost:8080/api/editdepartment", departmentData);
			Swal.fire("สำเร็จ", "ข้อมูลถูกแก้ไขแล้ว", "success");
			fetchDepart();
			setSelectedDepartmentId(null);
		} catch (error) {
			console.error("Error updating department:", error);
		}
	};

	const handleDeleteDepartment = async (departmentId) => {
		const isConfirmed = await Swal.fire({
			title: "ยืนยันการลบข้อมูล",
			text: "ข้อมูลที่ถูกลบจะไม่สามารถกู้คืนได้",
			icon: "warning",
			showCancelButton: true,
			confirmButtonText: "ยืนยัน",
			cancelButtonText: "ยกเลิก",
		}).then(result => result.isConfirmed);

		if (isConfirmed) {
			try {
				await axios.delete("http://localhost:8080/api/deldepartment", { data: { ID: departmentId } });
				Swal.fire("สำเร็จ", "ข้อมูลถูกลบแล้ว", "success");
				fetchDepart();
			} catch (error) {
				console.error("Error deleting department:", error);
			}
		}
	};

	const filteredDepartments = departlist.filter(department =>
		department.Name && department.Name.includes(searchTerm)
	);

	const handleRowClick = (department) => {
		if (mode === "edit") {
			handleEditDepartment(department);
		} else if (mode === "delete") {
			handleDeleteDepartment(department.ID);
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
							<button name="Add" className="event-button" onClick={handleAddDepartment}>
								<FontAwesomeIcon icon={faPlus} className="button-icon" />
								Add
							</button>
							<button name="Edit" className="event-button" onClick={() => setMode(mode === "edit" ? null : "edit")}>
								<FontAwesomeIcon icon={faEdit} className="button-icon" />
								{mode === "edit" ? "Cancel Edit" : "Edit"}
							</button>
							<button name="Delete" className="event-button" onClick={() => setMode(mode === "delete" ? null : "delete")}>
								<FontAwesomeIcon icon={faTrash} className="button-icon" />
								{mode === "delete" ? "Cancel Delete" : "Delete"}
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
							<tr>
								{columns.map((col, idx) => (
									<th className="vr_table-head-cell" key={idx}>
										{col}
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{filteredDepartments.length > 0 ? (
								filteredDepartments.map((department) => (
									<tr
										className="vr_table-body-row"
										key={department.ID}
										onClick={() => handleRowClick(department)}
										style={{ cursor: mode ? "pointer" : "default" }}
									>
										<td>{department.ID}</td>
										<td>{department.Name}</td>
									</tr>
								))
							) : (
								<tr><td colSpan={2}>No departments found</td></tr>
							)}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
}

export default Department;
