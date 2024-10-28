import React, { useEffect, useState } from "react";
import Nav from "../navbar/navbar";

function History({ category }) {
	const [historyList, setHistoryList] = useState([]);

	useEffect(() => {
		// ฟังก์ชันดึงข้อมูล history
		const fetchHistory = async () => {
			try {
				const response = await fetch(
					`http://localhost:8080/api/history/${category}`
				);
				const data = await response.json();
				setHistoryList(data);
			} catch (error) {
				console.error("Error fetching history:", error);
			}
		};

		fetchHistory();
	}, [category]);
	return (
		<>
			<div>
				<Nav />
			</div>
			<div>
				<h1>History List</h1>
				<table className="table">
					<thead>
						<tr>
							<th>BKLNUMBER</th>
							<th>Room Name</th>
							<th>Details</th>
							<th>Start Date</th>
							<th>Start Time</th>
							<th>End Time</th>
							<th>Status</th>
							<th>QR Code</th>
						</tr>
					</thead>
					<tbody>
						{historyList.map(history => (
							<tr key={history.bklnumber}>
								<td>{history.bklnumber}</td>
								<td>{history.rno}</td>
								<td>{history.Details}</td>
								<td>{history.start_date}</td>
								<td>{history.start_time}</td>
								<td>{history.end_time}</td>
								<td>{history.sno}</td>
								<td><img src={history.QR} alt="QR Code" style={{ width: '50px', height: '50px' }} /></td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
}

export default History;
