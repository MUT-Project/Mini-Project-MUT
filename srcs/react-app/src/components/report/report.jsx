import React from "react";
import Nav from '../navbar/navbar'
import "./report.css";
import MyChart1 from "./reportChart01.jsx";
import MyChart2 from "./reprotChart02.jsx";
import MyChart3 from "./reprotChart03.jsx";
import { UserRound, ClockArrowUp, ClockArrowDown } from 'lucide-react';


function Report() {

	const StatBooking = {
		Pbooking: 30,
		Ropen: 40,
		Rclose: 20
	};

	const Pbooking = StatBooking.Pbooking;
	const Ropen = StatBooking.Ropen;
	const Rclose = StatBooking.Rclose;

	return (
		<>
			<Nav />
			<div className="bg-report">
				<div className="container-report">
					<div className="report_Overview-show">
						<h2>Overview</h2>
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
									<div className="b2_po2_lefdow_text">
										<span className="number">{Pbooking}</span> People
									</div>
								</div>

								<div className="b2_po2_mid-report">
									<div className="b2_po2_leftop_text">
										<div className="b2_po2_lefdow_text_icon">
											<ClockArrowUp />
										</div>
										<p className="b2_po2_lefdow_text_w">Is Now Open</p>
									</div>
									<div className="b2_po2_lefdow_text">
										<span className="number">{Ropen}</span> Rooms
									</div>
								</div>

								<div className="b2_po2_lef-report">
									<div className="b2_po2_leftop_text">
										<div className="b2_po2_lefdow_text_icon">
											<ClockArrowDown />
										</div>
										<p className="b2_po2_lefdow_text_w">Is Now Closing</p>
									</div>
									<div className="b2_po2_lefdow_text">
										<span className="number">{Rclose}</span> Rooms
									</div>
								</div>
							</div>


							<div className="b2_po3-report">
								<div className="b2_po3_select-report">
									<input type="month" className="b2_po3_select_month-report" />
									<select className="b2_po3_select_month-report">
										<option value="">-- Select a Room --</option>
										<option value="MII101">MII101</option>
										<option value="MII102">MII102</option>
									</select>
									<button className="b2_po3_select_ok-reportbut">OK</button>
								</div>
								<MyChart3 />
							</div>

						</div>

						<div className="layoutright-report">
							<div className="b2_po4-report">
								<div className="b2_po3_select-report">
									<input type="month" className="b2_po3_select_month-report" />
									<select className="b2_po3_select_month-report">
										<option value="">-- Select a Room --</option>
										<option value="MII101">MII101</option>
										<option value="MII102">MII102</option>
									</select>
									<button className="b2_po3_select_ok-reportbut">OK</button>
								</div>
								<MyChart1 />
							</div>

							<div className="b2_po4-report">
								<div className="b2_po3_select-report">
									<input type="month" className="b2_po3_select_month-report" />
									<button className="b2_po3_select_ok-reportbut">OK</button>
								</div>
								<MyChart2 />
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);

}

export default Report;
