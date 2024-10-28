import React, { useState } from "react";
import Nav from "../navbar/navbar";
import "./department.css";
import add from "../../assets/Adds.png";
import deletes from "../../assets/Delete.png";
import edits from "../../assets/Edits.png";
import search from "../../assets/Search.png";
import Swal from 'sweetalert2'

function Department() {
  const columns = ["รหัสแผนก", "ชื่อแผนก"];
  const [Popup, setPopup] = useState(false); // state เพื่อควบคุม pop-up
  const openPopup = () => {
    setPopup(true);
  };
  const closePopup = () => {
    setPopup(false);
  };
  const Delete = () => {
	Swal.fire({
		title: "ยืนยันการลบข้อมูล",
		text: "ข้อมูลที่ถูกลบจะไม่สามารถกู้คืนได้",
		icon: "warning",
		showCancelButton: true,
		confirmButtonText: "ยืนยัน",
		cancelButtonText: "ยกเลิก",
		confirmButtonColor: "#3085d6",
		cancelButtonColor: "#d33"
	  }).then((result) => {
		if (result.isConfirmed) {
		  Swal.fire({
			title: "สำเร็จ",
			text: "ข้อมูลถูกลบแล้ว",
			icon: "success"
		  });
		}
	  });
	}
	const submitPopup = () => {
		setPopup(false);
		Swal.fire({
			title: "สำเร็จ",
			text: "ข้อมูลถูกเพิ่มแล้ว",
			icon: "success",
			confirmButtonText: "ยืนยัน",
			confirmButtonColor: "#3085d6",
		  })
	  };
  return (
    <>
      <Nav />
      <div className="header"></div>
      <div className="event-zone">
        <button type="submit" onClick={() => openPopup()}>
          <img src={add} alt="add" className="add-data" />
          Add
        </button>

        <button type="submit">
          <img src={edits} alt="edits" className="edits-data" />
          Edits
        </button>

        <button type="submit" onClick={() => Delete()}>
          <img src={deletes} alt="delete" className="delete-data" />
          Delete
        </button>

        <div class="search-container">
          <input
            className="input-text"
            type="text"
            placeholder="Search.."
            name="search"
          ></input>
          <button className="input-pic" type="input-pic">
            <img className="search-data" src={search} alt="search" />
          </button>
        </div>
      </div>
      <div className="table-zone">
        <table className="table_data">
          <thead className="table_header">
            <tr>
              {columns.map((column, index) => (
                <th key={index}>{column}</th>
              ))}
            </tr>
          </thead>
        </table>
      </div>

      {Popup && (
        <div className="popup">
          <div className="popup-inner">
            <h2>Department</h2>
            <form>
              <table>
                <tr>
                  <td>
                    <label>ชื่อแผนก </label>
                    <input type="text" placeholder=" " />
                  </td>
                </tr>
              </table>
            </form>
            <button className="close-popup" onClick={() => closePopup()}>
              Close
            </button>
            <button className="save-popup" onClick={() => submitPopup()}>
              Save
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Department;