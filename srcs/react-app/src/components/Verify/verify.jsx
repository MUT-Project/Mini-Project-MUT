import React, { useEffect, useState } from "react";
import Nav from "../navbar/navbar";
import "./verify.css";
import { format } from 'date-fns';
import Swal from "sweetalert2";

function Verify() {
	const [verifyList, setVerifyList] = useState([]);
	const [selectedIndex, setSelectedIndex] = useState(null);
	const [cancelReason, setCancelReason] = useState("");

	useEffect(() => {
		const fetchBookings = async () => {
			try {
				const response = await fetch("http://localhost:8080/api/verify");
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				const data = await response.json();
				setVerifyList(data);
			} catch (error) {
				console.error("Error fetching bookings:", error);
			}
		};
		fetchBookings();
	}, []);

	const openRejectPopup = (index) => {
		setSelectedIndex(index);
		rejectchoose()
	};
	const openVerifyPopup = (index) => {
		setSelectedIndex(index);
		verifychoose()
	};

	const verifychoose = () => {
		Swal.fire({
			title: "ยืนยันการอนุญาต",
			text: "อนุญาตให้เข้าใช้ห้อง",
			icon: "warning",
			showCancelButton: true,
			confirmButtonText: "ยืนยัน",
			cancelButtonText: "ยกเลิก",
			reverseButtons: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33"
		}).then((result) => {
			if (result.isConfirmed) {
				Swal.fire({
					title: "สำเร็จ",
					text: "อนุญาตการใช้ห้องแล้ว",
					icon: "success"
				});
			} else {
				setSelectedIndex(null)
			}
		});
	}

	const rejectchoose = () => {
		const { value: reason } = Swal.fire({
			title: "ยืนยันการปฏิเสธ",
			text: "ปฏิเสธการเข้าใช้ห้อง",
			icon: "warning",
			input: "text",
			inputValue: "เหตุผลการปฏิเสธ",
			showCancelButton: true,
			confirmButtonText: "ยืนยัน",
			cancelButtonText: "ยกเลิก",
			reverseButtons: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33"
		}).then((result) => {
			if (result.isConfirmed) {
				const value = result.value?.trim(); // ตัดช่องว่างออก
				if (!value) { // เช็คว่าค่าว่างหรือไม่
					Swal.fire({
						title: "กรุณากรอกเหตุผล",
						text: "คุณต้องระบุเหตุผลการปฏิเสธ",
						icon: "warning"
					});
					setSelectedIndex(null)
				} else {
					Swal.fire({
						title: "สำเร็จ",
						text: "ปฏิเสธการใช้ห้องแล้ว",
						icon: "error"
					});
				}
			} else {
				setSelectedIndex(null)
				setCancelReason("");
			}
		});
	}


	return (
		<>
			<Nav />
			<div className="vr_select-background">
				<div className="vr_booking-container">
					<div className="vr_table-container">
						<div className="vr_table-header">
							<h2 className="vr_table-title">Booking VIP Lists</h2>
						</div>
						<table className="vr_table">
							<thead>
								<tr>
									<th>เลขที่รายการ</th>
									<th>ห้อง</th>
									<th>รายละเอียดการจอง</th>
									<th>วันเดือนปี</th>
									<th>เวลา</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								{verifyList.map((booking, index) => {
									console.log("Booking:", booking);
									return (
										<tr key={index}>
											<td>{index + 1}</td>
											<td>{booking.rname}</td>
											<td>{booking.details}</td>
											<td>{booking.start_date ? format(new Date(booking.start_date), 'dd/MM/yyyy') : 'N/A'}</td>
											<td>{booking.Time_S ? booking.Time_S : 'N/A'} - {booking.Time_E ? booking.Time_E : 'N/A'}</td>
											<td>
												<div className="vr_action-buttons">
													<button className="vr_btn-reject" onClick={() => openRejectPopup(index)}>
														Reject
													</button>
													<button className="vr_btn-verify" onClick={() => openVerifyPopup(index)}>
														Verify
													</button>
												</div>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</>
	);
}

export default Verify;
