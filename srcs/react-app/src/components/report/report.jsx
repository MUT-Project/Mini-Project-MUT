import React, { useState } from "react";
import Nav from "../navbar/navbar";
import "./report.css";
import { User, ClockArrowUp, ClockArrowDown } from "lucide-react";
import { AgCharts } from "ag-charts-react";

function Report() {
  const Report = {
    Booking: 100,
    Open: 150,
    Close: 40,
  };

  const Booking = Report.Booking;
  const Open = Report.Open;
  const Close = Report.Close;

  const Chart1 = {
    MII: 7,
    ELEC: 4,
    MECH: 10,
	BU: 20,
	VET: 0,
  };

  const MII = Chart1.MII;
  const ELEC = Chart1.ELEC;
  const MECH = Chart1.MECH;
  const BU = Chart1.BU;
  const VET = Chart1.VET;


  const Chart2 = {
	Monday: 4,
	Tuesday: 7,
	Wednesday: 15,
	Thrusday: 5,
	Friday: 0,
	Saturday: 14,
	Sunday: 10,
  }

  const Monday = Chart2.Monday;
  const Tuesday = Chart2.Tuesday;
  const Wednesday = Chart2.Wednesday;
  const Thrusday = Chart2.Thrusday;
  const Friday = Chart2.Friday;
  const Saturday = Chart2.Saturday;
  const Sunday = Chart2.Sunday;

  const Chart3 = {
	MIIusing: 10,
	MIIcancel: 5,
	ELEusing: 15,
	ELECcancel: 5,
	MECHusing: 20,
	MECHcancel: 5,
	BUusing: 25,
	BUcancel: 5,
	VETusing: 30,
	VETcancel: 5,
  }

  const MIIusing = Chart3.MIIusing;
  const MIIcancel = Chart3.MIIcancel;
  const ELEusing = Chart3.ELEusing;
  const ELEcancel = Chart3.ELEcancel;
  const MECHusing = Chart3.MECHusing;
  const MECHcancel = Chart3.MECHcancel;
  const BUusing = Chart3.BUusing;
  const BUcancel = Chart3.BUcancel;
  const VETusing = Chart3.VETusing;
  const VETcancel = Chart3.VETcancel;


  const ChartExample1 = (e) => {
    const [options1, setOptions1] = useState({
      // Data: Data to be displayed in the chart
      data: [
        { month: "MII", avgTemp: 2.3, number: MII },
        { month: "ELEC", avgTemp: 6.3, number: ELEC },
        { month: "MECH", avgTemp: 16.2, number: MECH },
        { month: "BU", avgTemp: 22.8, number: BU },
        { month: "VET", avgTemp: 14.5, number: VET }
      ],
      // Series: Defines which chart type and data to use
      series: [{ type: "bar", xKey: "month", yKey: "number" }],
    });

    return <AgCharts options={options1} />;
  };

  const ChartExample2 = (e) => {
    const [options2, setOptions2] = useState({
      // Data: Data to be displayed in the chart
      data: [
        { month: "Monday", avgTemp: 2.3, number: Monday },
        { month: "Tuesday", avgTemp: 6.3, number: Tuesday },
        { month: "Wednesday", avgTemp: 16.2, number: Wednesday },
        { month: "Thrusday", avgTemp: 22.8, number: Thrusday },
        { month: "Friday", avgTemp: 14.5, number: Friday },
        { month: "Saturday", avgTemp: 8.9, number: Saturday },
		{ month: "Sunday", avgTemp: 8, number: Sunday },
      ],
      // Series: Defines which chart type and data to use
      series: [{ type: "bar", xKey: "month", yKey: "number" }],
    });

    return <AgCharts options={options2} />;
  };

  const ChartExample3 = (e) => {
    const [options3, setOptions3] = useState({
      // Data: Data to be displayed in the chart
      data: [
        { year: "MII", avgTemp: 2.3, Using: MIIusing , Cancel: MIIcancel},
		{ year: "ELEC", avgTemp: 2.3, Using: ELEusing , Cancel: ELEcancel},
		{ year: "MECH", avgTemp: 2.3, Using: MECHusing , Cancel: MECHcancel},
		{ year: "BU", avgTemp: 2.3, Using: BUusing , Cancel: BUcancel},
		{ year: "VET", avgTemp: 2.3, Using: VETusing , Cancel: VETcancel}
      ],
      // Series: Defines which chart type and data to use
      series: [
		{
			type: 'bar', // use 'bar' series
			xKey: 'year',
			yKey: 'Using',
			
			// ...other series options
		},
		{
			type: 'bar', // use 'line' series
			xKey: 'year',
			yKey: 'Cancel',
			// ...other series options
		},
	],
    });

    return <AgCharts options={options3} />;
  };

  return (
    <>
      <Nav />
      <div className="bgreport">
        <div className="container-report">
          <div className="top_text-report">
            <b> Booking Overview </b>
          </div>
          <div className="b1-report">
            <div className="b1_left-report">
              <div className="b1_zonetop">
                <p className="b1_info">{Booking}</p>
                <p className="b1_type">Peoples</p>
                <div className="b1-icon">
                  <User />
                </div>
              </div>
              <div className="b1_zonebot">
                <p className="b1_info">Has been booking now</p>
              </div>
            </div>
            <div className="b1_mid-report">
              <div className="b1_zonetop">
                <p className="b1_info">{Open}</p>
                <p className="b1_type">Rooms</p>
                <div className="b1-icon">
                  <ClockArrowUp />
                </div>
              </div>
              <div className="b1_zonebot">
                <p className="b1_info">is now opening</p>
              </div>
            </div>
            <div className="b1_right-report">
              <div className="b1_zonetop">
                <p className="b1_info">{Close}</p>
                <p className="b1_type">Rooms</p>
                <div className="b1-icon">
                  <ClockArrowDown />
                </div>
              </div>
              <div className="b1_zonebot">
                <p className="b1_info">is now closing</p>
              </div>
            </div>
          </div>
          <div className="top_text-report">
            <b> Graph Report </b>
          </div>
          <div className="b2-report">
			<div className="b2_head"></div>
			<div className="b2_top">
				<select className="b2_top_select">
					<option value="" disabled selected>DAY</option>
					<option value="" className="b2_top_select_option">DD</option>
				</select>
				<select className="b2_top_select">
					<option value="" disabled selected>MONTH</option>
					<option value="" className="b2_top_select_option">MM</option>
				</select>
				<select className="b2_top_select">
					<option value="" disabled selected>YEAR</option>
					<option value="" className="b2_top_select_option">YYYY</option>
				</select>
				<button className="b2_top_button">Confirm</button>
			</div>
			<div className="b2_bottom">
            <div className="b2_leftandRight">
              <div className="b2_text">
                <p>Total amount of account that had locked in July 2024</p>
              </div>
              <div className="b2_chart">
			  	<ChartExample1 />
              </div>
            </div>
            <div className="b2_mid">
			<div className="b2_text">
                <p>Total number of using room for each day of  MII207 in July 2024</p>
              </div>
              <div className="b2_chart">
			  	<ChartExample2 />
              </div>
            </div>
            <div className="b2_leftandRight">
			<div className="b2_text">
                <p>Total number of using room compare to canceling room of MII207 in July 2024</p>
              </div>
              <div className="b2_chart">
			  	<ChartExample3 />
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
