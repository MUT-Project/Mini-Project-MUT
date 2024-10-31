import React, { useState, useEffect } from "react";
import Nav from "../navbar/navbar";
import "./report.css";
import MyChart1 from "./reportChart01.jsx";
import MyChart2 from "./reprotChart02.jsx";
import MyChart3 from "./reprotChart03.jsx";
import { UserRound, ClockArrowUp, ClockArrowDown } from "lucide-react";
import Swal from "sweetalert2";

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

  const [Graph1_Data, setGraph1] = useState([]);

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
        setRoomArray(data);
	
        for (let i = 0; i < roomArray.length; i++) {
			console.log(roomArray.length);
        }
		console.log(Graph1_Data["0"].using);
      } catch (error) {
        console.error("Error fetching Data:", error);
      }
    } else {
      Swal.fire({
        title: "ข้อมูลไม่ครบ",
        text: "เลือกข้อมูลให้ครบก่อนทำการสร้างกราฟ",
        icon: "warning",
      });
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
        setRoomArray(data);

      } catch (error) {
        console.error("Error fetching Data:", error);
      }
    } else {
      Swal.fire({
        title: "ข้อมูลไม่ครบ",
        text: "เลือกข้อมูลให้ครบก่อนทำการสร้างกราฟ",
        icon: "warning",
      });
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
        console.log(data);
        setRoomArray(data);

        for (let i = 0; i < data.length; i++) {
          console.log(data[i].department + " " + data[i].lock);
        }
      } catch (error) {
        console.error("Error fetching Data:", error);
      }
    } else {
      Swal.fire({
        title: "ข้อมูลไม่ครบ",
        text: "เลือกข้อมูลให้ครบก่อนทำการสร้างกราฟ",
        icon: "warning",
      });
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

                <MyChart3 />
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
                <MyChart1 />
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
