import React, { useState } from "react";
import Nav from "../navbar/navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faSearch } from '@fortawesome/free-solid-svg-icons';
import Swal from "sweetalert2";

function Department() {
	const columns = ["รหัสแผนก", "ชื่อแผนก"];
	const [Popup, setPopup] = useState(false); // State to control the popup

	const openPopup = () => setPopup(true);
	const closePopup = () => setPopup(false);

	const Delete = () => {
		Swal.fire({
			title: "ยืนยันการลบข้อมูล",
			text: "ข้อมูลที่ถูกลบจะไม่สามารถกู้คืนได้",
			icon: "warning",
			showCancelButton: true,
			confirmButtonText: "ยืนยัน",
			cancelButtonText: "ยกเลิก",
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
		}).then((result) => {
			if (result.isConfirmed) {
				Swal.fire({
					title: "สำเร็จ",
					text: "ข้อมูลถูกลบแล้ว",
					icon: "success",
				});
			}
		});
	};

	const submitPopup = (event) => {
		event.preventDefault(); // Prevent default form submission
		const form = event.target;
		const departmentName = form.departmentName.value;

		if (!departmentName) {
			Swal.fire({
				title: "ข้อผิดพลาด",
				text: "กรุณากรอกชื่อแผนก",
				icon: "error",
			});
			return;
		}

		setPopup(false);
		Swal.fire({
			title: "สำเร็จ",
			text: "ข้อมูลถูกเพิ่มแล้ว",
			icon: "success",
			confirmButtonText: "ยืนยัน",
			confirmButtonColor: "#3085d6",
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
							<button className="event-button">
								<FontAwesomeIcon icon={faEdit} className="button-icon" />
								Edit
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
							<tr className="vr_table-body-row">
								<td className="vr_table-cell">101</td>
								<td className="vr_table-cell">Department A</td>
							</tr>
						</tbody>
					</table>
				</div>

				{Popup && (
					<div className="popup">
						<div className="popup-inner-de">
							<h2 className="popup_title">Department</h2>
							<form onSubmit={submitPopup}>
								<div className="popup_item">
									<label className="popup_label">ชื่อแผนก</label>
									<input
										type="text"
										name="departmentName" // Name attribute for form data
										className="popup_input_and_select_d"
										placeholder=" "
										required
									/>
								</div>
								<div className="popup-buttons">
									<button type="button" className="close-popup-department" onClick={closePopup}>
										Close
									</button>
									<button type="submit" className="save-popup">
										Save
									</button>
								</div>
							</form>
						</div>
					</div>
				)}
			</div>
		</>
	);
}

export default Department;
