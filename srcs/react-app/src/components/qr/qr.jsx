import React from "react";
import "./qr.css";

function QR() {
	return (
		<>
			<div className="bgqr">
				<h3>ยืนยันการเข้าใช้ห้อง</h3>
				<div className="GAY">
					<button className="YES">ยืนยัน</button>
					<button className="NO">ยกเลิก</button>
				</div>
			</div >
		</>
	);
}

export default QR;
