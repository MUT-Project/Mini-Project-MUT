import React, { useState, useEffect } from "react";
import Nav from "../navbar/navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faSearch } from '@fortawesome/free-solid-svg-icons';
import Swal from "sweetalert2";
import axios from 'axios';

function Department() {
	const columns = ["รหัสแผนก", "ชื่อแผนก"];
	const [departmentname, setDepartmentname] = useState("");
	const [selectedDepartmentId, setSelectedDepartmentId] = useState(null);
	const [isEditMode, setIsEditMode] = useState(false);
	const [departlist, setDepartlist] = useState([]);

	useEffect(() => {
		fetchDepart();
	}, []);

	const fetchDepart = async () => {
		try {
			const response = await axios.get('http://localhost:8080/api/department');
			setDepartlist(response.data);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	const AddDepart = () => {
		Swal.fire({
			title: 'Manage Department',
			html: `
				<form id="manage-depart-form" class="popup-form">
					<div class="form-row">
						<div class="form-column">
							<label>ชื่อแผนก</label>
							<input type="text" name="DepartName" class="swal2-input-depart" required />
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
				const form = document.getElementById('manage-depart-form');
				const formData = new FormData(form);
				const departName = formData.get('DepartName');
				return departName;
			}
		}).then((result) => {
			if (result.isConfirmed && result.value) {
				const departmentName = result.value;
				setDepartmentname(departmentName);
				addDepart(departmentName);
				SuccessAdd();
				fetchDepart();
			}
		});
	};

	const addDepart = async (name) => {
		try {
			await axios.post('http://localhost:8080/api/adddepartment', { Name: name });
			fetchDepart()
		} catch (error) {
			console.error("Error adding department:", error);
		}
	};

	const handleRowClick = (department) => {
		if (isEditMode) {
			setSelectedDepartmentId(department.ID);
			editDepart(department);
		} else {
			setSelectedDepartmentId(department.ID);
		}
	};
	const editDepart = (department) => {
		Swal.fire({
			title: 'Manage Department',
			html: `
                <form id="manage-edit-depart-form" class="popup-form">
                    <div class="form-row">
                        <div class="form-column">
                            <label>ชื่อแผนก</label>
                            <input type="text" name="DepartName" class="swal2-input-depart" required value="${department.Name}" />
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
				const form = document.getElementById('manage-edit-depart-form');
				const formData = new FormData(form);
				return {
					ID: department.ID,
					Name: formData.get('DepartName'),
				};
			}
		}).then((result) => {
			if (result.isConfirmed) {
				updateDepart(result.value);
				setSelectedDepartmentId(null);
			} else {
				setSelectedDepartmentId(null);
			}
		});
	};

	const updateDepart = async (updatedDepartment) => {
		try {
			await axios.put('http://localhost:8080/api/editdepartment', updatedDepartment);
			Swal.fire("สำเร็จ", "ข้อมูลถูกแก้ไขแล้ว", "success");
			fetchDepart();
		} catch (error) {
			console.error("Error updating department:", error);
		}
	};

	const confirmDeleteDepart = (departmentId) => {
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
		if (selectedDepartmentId) {
			const isConfirmed = await confirmDeleteDepart(selectedDepartmentId);
			if (isConfirmed) {
				await handleDeleteDepartment(selectedDepartmentId);
			}
		} else {
			Swal.fire("ข้อผิดพลาด", "กรุณาเลือกแผนกที่ต้องการลบ", "error");
		}
	};

	const handleDeleteDepartment = async (departmentId) => {
		try {
			await axios.delete('http://localhost:8080/api/deldepartment', { data: { ID: departmentId } });
			Swal.fire("สำเร็จ", "ข้อมูลถูกลบแล้ว", "success");
			fetchDepart();
			setSelectedDepartmentId(null);
		} catch (error) {
			console.error("Error deleting department:", error);
		}
	};

	const SuccessAdd = () => {
		Swal.fire({
			title: "สำเร็จ",
			text: "ข้อมูลถูกเพิ่มแล้ว",
			icon: "success",
			confirmButtonText: "ยืนยัน",
			confirmButtonColor: "#3085d6",
		});
	}

	return (
		<>
			<Nav />
			<div className="vr_select-background">
				<div className="header-room"></div>
				<div className="table-zone">
					<div className="event-zone">
						<div className="vr_action-buttons">
							<button className="event-button" onClick={AddDepart}>
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
							{departlist.map((depart, index) => (
								<tr
									className="vr_table-body-row"
									key={depart.ID}
									onClick={() => handleRowClick(depart)}
									style={{ cursor: isEditMode ? "pointer" : "default" }}
								>
									<td>{depart.ID}</td>
									<td>{depart.Name}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
}

export default Department;
