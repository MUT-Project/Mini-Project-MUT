import React, { useState, useEffect } from "react";
import Nav from "../navbar/navbar";
import "./report.css";
import MyChart2 from "./reprotChart02.jsx";
import { UserRound, ClockArrowUp, ClockArrowDown } from "lucide-react";
import Swal from "sweetalert2";
import { AgCharts } from "ag-charts-react";

function Report() {
	const [Pbooking, setPbooking] = useState();
	const [Ropen, setRopen] = useState();
	const [Rclose, setRclose] = useState();

	const [rooms, setRooms] = useState([]);
	const [roomArray, setRoomArray] = useState([]);
	let selectedMonth1 = "";
	let selectedMonth2 = "";
	let selectedMonth3 = "";
	let selectedRoom1 = "";
	let selectedRoom2 = "";

	let Graph1_Data = [];
	const [Graph1_Display, setgraph1] = useState([]);
	const [temp_graph1, setG1] = useState([]);

	let Graph2_Data = [];
	const [Graph2_Display, setgraph2] = useState([]);
	const [temp_graph2, setG2] = useState([]);

	let Graph3_Data = [];
	const [Graph3_Display, setgraph3] = useState([]);
	const [temp_graph3, setG3] = useState([]);

	const displayGraph1 = () => {
		console.log(Graph1_Data);
		for (let day = 1; day <= 31; day++) {
			const usage = Graph1_Data.find((item) => item.Day === day);

			if (usage) {
				temp_graph1.push({ Day: day, Nd1: usage.Nd1 });
			} else {
				// ถ้าไม่มีข้อมูลการใช้งาน เซ็ต Nd1 เป็น 0
				temp_graph1.push({ Day: day, Nd1: 0 });
			}
		}
		setgraph1(temp_graph1);
		console.log(temp_graph1);
	};

	const displayGraph2 = () => {
		for (let i = 0; i < Graph2_Data.length; i++) {
			let monthIndex = selectedMonth2.split("-")[1];

			const monthNames = [
				"January",
				"February",
				"March",
				"April",
				"May",
				"June",
				"July",
				"August",
				"September",
				"October",
				"November",
				"December",
			];

			let data = monthNames[monthIndex - 1];

			temp_graph2.push({
				month: data,
				Use: Number(Graph2_Data[0].Use),
				Cancel: Number(Graph2_Data[0].Cancel),
			});
		}
		setgraph2(temp_graph2);
		console.log(temp_graph2);
	};

	const displayGraph3 = () => {
		console.log(Graph3_Data);
		for (let i = 0; i < Graph3_Data.length; i++) {
			temp_graph3.push({
				Department: Graph3_Data[i].Department,
				Lock: Graph3_Data[i].Lock,
			});
		}
		setgraph3(temp_graph3);
		console.log(temp_graph3);
	};

	const options1 = {
		data: Graph1_Display,
		title: {
			text: "Room Using in Month",
		},
		series: [
			{
				type: "line",
				xKey: "Day",
				yKey: "Nd1",
			},
		],

		background: {
			fill: "#ffff",
		},
	};

	const options2 = {
		data: Graph2_Display,
		title: {
			text: "Room Use & Cancle",
		},
		series: [
			{
				type: "bar",
				xKey: "month",
				yKey: "Use",
			},
			{
				type: "bar",
				xKey: "month",
				yKey: "Cancel",
			},
		],
		background: {
			fill: "#ffff",
		},
	};

	const options3 = {
		data: Graph3_Display,
		title: {
			text: "Number of Locked Account",
		},
		series: [
			{
				type: "bar",
				xKey: "Department",
				yKey: "Lock",
			},
		],
		background: {
			fill: "#ffff",
		},
	};

	const DateChange1 = (e) => {
		selectedMonth1 = e.target.value;
		console.log(selectedMonth1);
	};

	const DateChange2 = (e) => {
		selectedMonth2 = e.target.value;
		console.log(selectedMonth2);
	};

	const DateChange3 = (e) => {
		selectedMonth3 = e.target.value;
		console.log(selectedMonth3);
	};

	const roomChange1 = (e) => {
		// Get JSON key
		selectedRoom1 = Object.keys(rooms).find(
			(key) => rooms[key] === e.target.value
		);
		console.log(selectedRoom1);
	};

	const roomChange2 = (e) => {
		// Get JSON key
		selectedRoom2 = Object.keys(rooms).find(
			(key) => rooms[key] === e.target.value
		);
		console.log(selectedRoom2);
	};

	const changeLineGraph = async () => {
		if (selectedRoom1 && selectedMonth1) {
			try {
				const response = await fetch(
					`http://localhost:8080/api/graph1?date=${selectedMonth1}&room=${selectedRoom1}`
				);
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				const data = await response.json();

				if (data !== null && data !== undefined) {
					setRoomArray(data);
					Graph1_Data = data.map((item) => ({
						Day: Number(item.date),
						Nd1: Number(item.using),
					}));
					displayGraph1();
				}
			} catch (error) {
				console.error("Error fetching Data:", error);
			}
		}
	};

	const changeBarGraph1 = async () => {
		if (selectedRoom2 && selectedMonth2) {
			try {
				const response = await fetch(
					`http://localhost:8080/api/graph2?date=${selectedMonth2}&room=${selectedRoom2}`
				);
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				const data = await response.json();

				if (data !== null && data !== undefined) {
					setRoomArray(data);
					console.log(data);
					const monthName = new Date(selectedMonth2).toLocaleString("en-US", {
						month: "long",
					});
					Graph2_Data = data.map((item) => ({
						Month: monthName,
						Use: Number(item.using),
						Cancel: Number(item.cancel),
					}));
					displayGraph2();
				}
			} catch (error) {
				console.error("Error fetching Data:", error);
			}
		}
	};

	const changeBarGraph2 = async () => {
		if (selectedMonth3) {
			try {
				const response = await fetch(
					`http://localhost:8080/api/graph3?date=${selectedMonth3}`
				);
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				const data = await response.json();

				if (data !== null && data !== undefined) {
					setRoomArray(data);
					const monthName = new Date(selectedMonth3).toLocaleString("en-US", {
						month: "long",
					});
					Graph3_Data = data.map((item) => ({
						Department: String(item.department),
						Lock: Number(item.lock),
					}));
					displayGraph3();
				}
			} catch (error) {
				console.error("Error fetching Data:", error);
			}
		}
	};

	useEffect(() => {
		const fetchRooms = async () => {
			try {
				const response = await fetch("http://localhost:8080/api/getrooms");
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				const data = await response.json();
				setRooms(data); // จัดเก็บข้อมูลห้องใน state
				// selectedRoom = data["1"];
			} catch (error) {
				console.error("Error fetching rooms:", error);
			}
		};

		const overview1 = async () => {
			try {
				const response = await fetch("http://localhost:8080/api/overview1");
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				const data = await response.json();
				setPbooking(data["0"].bklnumber);
			} catch (error) {
				console.error("Error fetching rooms:", error);
			}
		};

		const overview2 = async () => {
			try {
				const response = await fetch("http://localhost:8080/api/overview2");
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				const data = await response.json();
				setRopen(data["0"].open);
			} catch (error) {
				console.error("Error fetching rooms:", error);
			}
		};

		const overview3 = async () => {
			try {
				const response = await fetch("http://localhost:8080/api/overview3");
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				const data = await response.json();
				setRclose(data["0"].close);
			} catch (error) {
				console.error("Error fetching rooms:", error);
			}
		};

		fetchRooms();
		overview1();
		overview2();
		overview3();
	}, []);

	return (
		<>
			<Nav />
			{/* <MyChart /> */}
			<div className="bg-report">
				<div className="container-report">
					<div className="b2_po1-report">
						<div className="b2_po1_lef-report">
							<b className="b2_po1_lef_b-report">REPORT !!!</b>
						</div>
						{/* <div className="b2_po1_mid1-report">
							
						</div>
						<div className="b2_po1_mid2-report">
							
						</div> */}
					</div>
					<div className="layoutmain-report">
						<div className="layoutleft-report">
							<div className="b2_po2-report">
								<div className="b2_po2_lef-report">
									<div className="b2_po2_leftop_text">
										<div className="b2_po2_lefdow_text_icon">
											<UserRound />
										</div>
										<p className="b2_po2_lefdow_text_w">Booking Now</p>
									</div>
									<div className="b2_po2_lefdow_text">{Pbooking} People</div>
								</div>
								<div className="b2_po2_mid-report">
									<div className="b2_po2_leftop_text">
										<div className="b2_po2_lefdow_text_icon">
											<ClockArrowUp />
										</div>
										<p className="b2_po2_lefdow_text_w">Is Now Open</p>
									</div>
									<div className="b2_po2_lefdow_text">{Ropen} Rooms</div>
								</div>
								<div className="b2_po2_lef-report">
									<div className="b2_po2_leftop_text">
										<div className="b2_po2_lefdow_text_icon">
											<ClockArrowDown />
										</div>
										<p className="b2_po2_lefdow_text_w">Is Now Closing</p>
									</div>
									<div className="b2_po2_lefdow_text">{Rclose} Rooms</div>
								</div>
							</div>
							<div className="b2_po3-report">
								<div className="b2_po3_select-report">
									<input
										type="month"
										className="b2_po3_select_month-report"
										onChange={DateChange1}
									></input>

									<select
										type="text"
										className="b2_po3_select_month-report"
										onChange={roomChange1}
									>
										<option value="">-- Select a Room --</option>
										{Object.entries(rooms).map(([key, value]) => (
											<option key={key} value={value}>
												{value} {/* ข้อความจะแสดงเป็นหมายเลขห้อง */}
											</option>
										))}
									</select>
									<button
										className="b2_po3_select_ok-reportbut"
										onClick={changeLineGraph}
									>
										OK
									</button>
								</div>
								<div
									style={{
										height: "90%",
										width: "90%",
										marginLeft: "5%",
										marginRight: "5%",
									}}
								>
									<AgCharts options={options1} />
								</div>
							</div>
						</div>
						<div className="layoutright-report">
							<div className="b2_po4-report">
								<div className="b2_po3_select-report">
									<input
										type="month"
										className="b2_po3_select_month-report"
										onChange={DateChange2}
									></input>
									<select
										type="text"
										className="b2_po3_select_month-report"
										onChange={roomChange2}
									>
										<option value="">-- Select a Room --</option>
										{Object.entries(rooms).map(([key, value]) => (
											<option key={key} value={value}>
												{value} {/* ข้อความจะแสดงเป็นหมายเลขห้อง */}
											</option>
										))}
									</select>
									<button
										className="b2_po3_select_ok-reportbut"
										onClick={changeBarGraph1}
									>
										OK
									</button>
								</div>
								<div style={{ height: "90%", width: "90%", margin: "auto" }}>
									<AgCharts options={options2} />
								</div>
							</div>
							<div className="b2_po4-report">
								<div className="b2_po3_select-report">
									<input
										type="month"
										className="b2_po3_select_month-report"
										onChange={DateChange3}
									></input>
									<button
										className="b2_po3_select_ok-reportbut"
										onClick={changeBarGraph2}
									>
										OK
									</button>
								</div>
								<div style={{ height: "90%", width: "90%" }}>
									<AgCharts options={options3} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Report;
