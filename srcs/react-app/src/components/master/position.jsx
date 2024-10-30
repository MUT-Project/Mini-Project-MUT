import React, { useState } from "react";
import Nav from "../navbar/navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faSearch } from '@fortawesome/free-solid-svg-icons';
import Swal from "sweetalert2";

function Position() {
	const columns = ["รหัสตำแหน่ง", "ชื่อตำแหน่ง", "สิทธิ์การเข้าใช้"];
	const [Popup, setPopup] = useState(false); // State to control the popup
	const [positionName, setPositionName] = useState(""); // State for position name
	const [permissions, setPermissions] = useState({
		book: false,
		manage: false,
		basicInfo: false,
		checkHistory: false,
		report: false,
		approveRoom: false,
	}); // State for checkbox permissions

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

	const AddPosition = () => {
		Swal.fire({
			title: 'Manage Department',
			html: `
				<form id="manage-room-form" class="popup-form">
					<div class="form-row">
						<div class="form-column">
							<label>ชื่อตำแหน่ง</label>
							<input type="text" name="PositionName" class="swal2-input-depart" placeholder=" " required />
						</div>
					</div>
					<div class="form-row">
						<div class="form-column">
							<label>สิทธิ์การเข้าใช้ : </label>
						</div>
						<div class="form-column">
							<input type="checkbox" name="reserve" value="1">
							<label for="vehicle1">การจอง</label>
						</div>
						<div class="form-column">
							<input type="checkbox" name="้history" value="1">
							<label for="vehicle1">เช็คประวัติ</label>
						</div>
					</div>
					<div class="form-row">
						<div class="form-column">
						</div>
						<div class="form-column">
							<input type="checkbox" name="reserve" value="1">
							<label for="vehicle1">การจัดการ</label>
						</div>
						<div class="form-column">
							<input type="checkbox" name="้history" value="1">
							<label for="vehicle1">จัดการข้อมูลพื้นฐาน</label>
						</div>
					</div>
					<div class="form-row">
						<div class="form-column">
						</div>
						<div class="form-column">
							<input type="checkbox" name="reserve" value="1">
							<label for="vehicle1">รายงาน</label>
						</div>
						<div class="form-column">
							<input type="checkbox" name="้history" value="1">
							<label for="vehicle1">อนุมัติ</label>
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
				const form = document.getElementById('manage-room-form');
				return form.reportValidity() ? form : false;
			}
		}).then((result) => {
			if (result.isConfirmed) {
				const formData = Object.fromEntries(new FormData(result.value));
				Swal.fire({
					title: "สำเร็จ",
					text: "ข้อมูลถูกเพิ่มแล้ว",
					icon: "success",
					confirmButtonText: "ยืนยัน",
					confirmButtonColor: "#3085d6",
				});
			}
		});
	};

	const EditPosition = () => {
		Swal.fire({
			title: 'Manage Department',
			html: `
				<form id="manage-room-form" class="popup-form">
					<div class="form-row">
						<div class="form-column">
							<label>ชื่อตำแหน่ง</label>
							<input type="text" name="PositionName" class="swal2-input-depart" placeholder=" " required />
						</div>
					</div>
					<div class="form-row">
						<div class="form-column">
							<label>สิทธิ์การเข้าใช้ : </label>
						</div>
						<div class="form-column">
							<input type="checkbox" name="reserve" value="1">
							<label for="vehicle1">การจอง</label>
						</div>
						<div class="form-column">
							<input type="checkbox" name="้history" value="1">
							<label for="vehicle1">เช็คประวัติ</label>
						</div>
					</div>
					<div class="form-row">
						<div class="form-column">
						</div>
						<div class="form-column">
							<input type="checkbox" name="reserve" value="1">
							<label for="vehicle1">การจัดการ</label>
						</div>
						<div class="form-column">
							<input type="checkbox" name="้history" value="1">
							<label for="vehicle1">จัดการข้อมูลพื้นฐาน</label>
						</div>
					</div>
					<div class="form-row">
						<div class="form-column">
						</div>
						<div class="form-column">
							<input type="checkbox" name="reserve" value="1">
							<label for="vehicle1">รายงาน</label>
						</div>
						<div class="form-column">
							<input type="checkbox" name="้history" value="1">
							<label for="vehicle1">อนุมัติ</label>
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
				const form = document.getElementById('manage-room-form');
				return form.reportValidity() ? form : false;
			}
		}).then((result) => {
			if (result.isConfirmed) {
				const formData = Object.fromEntries(new FormData(result.value));
				Swal.fire({
					title: "สำเร็จ",
					text: "ข้อมูลถูกแก้ไขแล้ว",
					icon: "success",
					confirmButtonText: "ยืนยัน",
					confirmButtonColor: "#3085d6",
				});
			}
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
							<button className="event-button" onClick={AddPosition}>
								<FontAwesomeIcon icon={faPlus} className="button-icon" />
								Add
							</button>
							<button className="event-button" onClick={EditPosition}>
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
								<td className="vr_table-cell">Position A</td>
								<td className="vr_table-cell">111111</td>
							</tr>
						</tbody>
					</table>
				</div>

				{/* {Popup && (
					<div className="popup">
						<div className="popup-position-po">
							<h2 className="popup_title">Position</h2>
							<form onSubmit={submitPopup}>
								<div>
									<label className="popup_label">ชื่อตำแหน่ง</label>
									<input
										type="text"
										className="popup_input_and_select_p"
										placeholder=" "
										value={positionName}
										onChange={(e) => setPositionName(e.target.value)} // Handle input change
										required
									/>
								</div>
								<div className="row">
									<div className="col co-1">
										<label className="popup_label">สิทธิ์การเข้าใช้งาน</label>
									</div>
									<div className="col co-2">
										<label className="popup_label">
											<input
												className="popup_checkbox"
												type="checkbox"
												name="book"
												checked={permissions.book}
												onChange={handleCheckboxChange} // Handle checkbox change
											/>{" "}
											การจอง
										</label>{" "}
										<br />
										<label className="popup_label">
											<input
												className="popup_checkbox"
												type="checkbox"
												name="manage"
												checked={permissions.manage}
												onChange={handleCheckboxChange}
											/>{" "}
											จัดการ
										</label>{" "}
										<br />
										<label className="popup_label">
											<input
												className="popup_checkbox"
												type="checkbox"
												name="basicInfo"
												checked={permissions.basicInfo}
												onChange={handleCheckboxChange}
											/>{" "}
											ข้อมูลพื้นฐาน
										</label>
									</div>
									<div className="col co-3">
										<label className="popup_label">
											<input
												className="popup_checkbox"
												type="checkbox"
												name="checkHistory"
												checked={permissions.checkHistory}
												onChange={handleCheckboxChange}
											/>{" "}
											ตรวจสอบประวัติ
										</label>{" "}
										<br />
										<label className="popup_label">
											<input
												className="popup_checkbox"
												type="checkbox"
												name="report"
												checked={permissions.report}
												onChange={handleCheckboxChange}
											/>{" "}
											รายงาน
										</label>{" "}
										<br />
										<label className="popup_label">
											<input
												className="popup_checkbox"
												type="checkbox"
												name="approveRoom"
												checked={permissions.approveRoom}
												onChange={handleCheckboxChange}
											/>{" "}
											อนุมัติห้อง
										</label>
									</div>
								</div>
								<div className="buttons">
									<button type="button" className="close-popup-position" onClick={closePopup}>
										Close
									</button>
									<button type="submit" className="save-popup">
										Save
									</button>
								</div>
							</form>
						</div>
					</div>
				)} */}
			</div>
		</>
	);
}

export default Position;
