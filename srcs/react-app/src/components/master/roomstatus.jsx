import React, { useState } from "react";
import Nav from "../navbar/navbar";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesome
import { faPlus, faEdit, faTrash, faSearch } from "@fortawesome/free-solid-svg-icons"; // Import specific icons

function Status() {
	const columns = ["รหัสสถานะ", "สถานะห้อง"]; // Table columns
	const [popup, setPopup] = useState(false); // State to control pop-up

	// Function to open the popup
	const openPopup = () => {
		setPopup(true);
	};

	// Function to close the popup
	const closePopup = () => {
		setPopup(false);
	};

	// Function to handle delete action
	const handleDelete = () => {
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

	// Function to handle submit action in popup
	const submitPopup = () => {
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
							<button className="event-button" onClick={handleDelete}>
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
							<tr>
								{columns.map((col, idx) => (
									<th className="vr_table-head-cell" key={idx}>
										{col}
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{/* Sample row, replace with actual data */}
							<tr className="vr_table-body-row">
								<td className="vr_table-cell">101</td>
								<td className="vr_table-cell">Available</td>
							</tr>
						</tbody>
					</table>
				</div>
				{popup && (
					<div className="popup">
						<div className="popup-inner-st">
							<h2 className="popup_title">Room Status</h2>
							<form>
								<div className="popup_item">
									<label className="popup_label_status">สถานะห้อง</label>
									<input
										type="text"
										className="popup_input_and_select_s"
										placeholder="Enter room status"
									/>
								</div>
							</form>
							<div className="popup-buttons">
								<button onClick={closePopup} className="close-popup_status">
									Close
								</button>
								<button className="save-popup" onClick={submitPopup}>
									Save
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	);
}

export default Status;
