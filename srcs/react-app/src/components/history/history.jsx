import React, { useState } from "react";
import Nav from "../navbar/navbar";
import "./history.css";

function History() {
  const columns = [
    "ลำดับ",
    "เลขที่ใบจอง",
    "ห้องประชุม",
    "รายละเอียดการจอง",
    "วัน/เดือน/ปี",
    "เวลา",
    "สถานะ",
  ];
  const [Underlined, setUnderlined] = useState(null);
  const Filter_Click = (id) => {
    setUnderlined(id);
  };
  const setColor = (value) => {
    switch (value) {
      case 1:
        return "green";
      case 2:
        return "orange";
      case 3:
        return "#FF0302";
      case 4:
        return "#3B9367";
      case 5:
        return "blue";
      case 6:
        return "purple";
      default:
        return "#633B48";
    }
  };
  return (
    <>
      <Nav />
      <div className="all_componant">
        <div className="header"></div>
        <div className="selection-zone">
          <p
            className="upcomming"
            onClick={() => Filter_Click(1)}
            style={{
              textDecoration: Underlined === 1 ? "underline" : "none",
              cursor: "pointer",
            }}
          >
            upcomming
          </p>

          <p
            className="On_Progress"
            onClick={() => Filter_Click(2)}
            style={{
              textDecoration: Underlined === 2 ? "underline" : "none",
              cursor: "pointer",
            }}
          >
            On_Progress
          </p>

          <p
            className="Complete"
            onClick={() => Filter_Click(3)}
            style={{
              textDecoration: Underlined === 3 ? "underline" : "none",
              cursor: "pointer",
            }}
          >
            Complete
          </p>

          <p
            className="Uncomplete"
            onClick={() => Filter_Click(4)}
            style={{
              textDecoration: Underlined === 4 ? "underline" : "none",
              cursor: "pointer",
            }}
          >
            Uncomplete
          </p>

          <p
            className="Canceled"
            onClick={() => Filter_Click(5)}
            style={{
              textDecoration: Underlined === 5 ? "underline" : "none",
              cursor: "pointer",
            }}
          >
            Canceled
          </p>

          <p
            className="Not_Coming"
            onClick={() => Filter_Click(6)}
            style={{
              textDecoration: Underlined === 6 ? "underline" : "none",
              cursor: "pointer",
            }}
          >
            Not coming on time
          </p>
        </div>

        <div className="table-zone">
          <table>
            <thead>
              <tr>
                {/* ใช้ map เพื่อสร้าง <th> ทั้ง 7 คอลัมน์เมื่อมีการคลิก */}
                {columns.map((column, index) => (
                  <th key={index}>{column}</th>
                ))}
              </tr>
            </thead>

            <th>
              <p>hello</p>
            </th>
			<th>
              <p>hello</p>
            </th>
			<th>
              <p>hello</p>
            </th>
			<th>
              <p>hello</p>
            </th>
			<th>
              <p>hello</p>
            </th>
			<th>
              <p>hello</p>
            </th>

            <th style={{ color: setColor(Underlined) }}>
              <p>hello</p>
            </th>
          </table>
        </div>
      </div>
    </>
  );
}

export default History;
