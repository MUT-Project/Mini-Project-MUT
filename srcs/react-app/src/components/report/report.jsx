import React, { useState } from "react";
import Nav from "../navbar/navbar";
import "./report.css";
import { User, ClockArrowUp, ClockArrowDown } from "lucide-react";
import { createRoot } from "react-dom/client";
import { AgCharts } from "ag-charts-react";
import "./index.jsx";

function Report() {
  const Report = {
    Booking: 100,
    Open: 150,
    Close: 40,
  };

  const Booking = Report.Booking;
  const Open = Report.Open;
  const Close = Report.Close;

  const Chart = {
    MII: 7,
    ELEC: 4,
    MECH: 10,
	BU: 20,
	VET: 0,
	Monday: 4,
	Tuesday: 7,
	Wednesday: 15,
	Thrusday: 5,
	Friday: 0,
	Saturday: 14,
	Sunday: 10,

  };

  const MII = Chart.MII;
  const ELEC = Chart.ELEC;
  const MECH = Chart.MECH;
  const BU = Chart.BU;
  const VET = Chart.VET;
  const Monday = Chart.Monday;
  const Tuesday = Chart.Tuesday;
  const Wednesday = Chart.Wednesday;
  const Thrusday = Chart.Thrusday;
  const Friday = Chart.Friday;
  const Saturday = Chart.Saturday;
  const Sunday = Chart.Sunday;

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
        { month: "Jan", avgTemp: 2.3, iceCreamSales: 2 , iceCreamSales1: 1},
        { month: "Mar", avgTemp: 6.3, iceCreamSales: 50 },
        { month: "May", avgTemp: 16.2, iceCreamSales: 150 },
        { month: "Jul", avgTemp: 22.8, iceCreamSales: 100 },
        { month: "Sep", avgTemp: 14.5, iceCreamSales: 200 },
        { month: "Nov", avgTemp: 8.9, iceCreamSales: 150 },
      ],
      // Series: Defines which chart type and data to use
      series: [{ type: "bar", xKey: "month", yKey: "iceCreamSales"}],
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
    </>
  );
}

export default Report;
