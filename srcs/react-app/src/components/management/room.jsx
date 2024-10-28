import React, { useState} from "react";
import Nav from "../navbar/navbar";
import "./room.css";
import add from "../../assets/Adds.png";
import deletes from "../../assets/Delete.png";
import edits from "../../assets/Edits.png";
import search from "../../assets/Search.png";
import Swal from 'sweetalert2'

function Room() {
  const columns = [
    "รหัสผู้ใช้",
    "ชื่อผู้ใช้",
    "นามสกุล",
    "แผนก",
    "ตำแหน่ง",
    "สถานะ",
    "คะแนนผู้ใช้",
  ];
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
      <div className="all_componant">
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
                {/* ใช้ map เพื่อสร้าง <th> ทั้ง 7 คอลัมน์เมื่อมีการคลิก */}
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
              <h2>User Form</h2>
              <form>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <label>ชื่อ </label>
                        <input type="text" placeholder=" " />
                      </td>
                      <td>
                        <label>นามสกุล </label>
                        <input type="text" placeholder=" " />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label>username </label>
                        <input type="text" placeholder=" " />
                      </td>
                      <td>
                        <label>Password </label>
                        <input type="password" placeholder=" " />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label>แผนก </label>
                        <select>
                          <option value=""> </option>
                          <option value="option1">MII</option>
                          <option value="option2">VET</option>
                          <option value="option3">BU</option>
                          <option value="option4">ELEC</option>
                        </select>
                      </td>
                      <td>
                        <label>ตำแหน่ง </label>
                        <select>
                          <option value=""> </option>
                          <option value="option1">หัวหน้าห้องประชุม</option>
                          <option value="option2">พนักงานทั่วไป</option>
                          <option value="option3">แม่บ้าน</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label>สถานะผู้ใช้ </label>
                        <select>
                          <option value=""> </option>
                          <option value="option1">ทำงานอยู่</option>
                          <option value="option2">ลาออก</option>
                        </select>
                      </td>
                      <td>
                        <label>Email </label>
                        <input type="email" placeholder=" " />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </form>
              <button className="close-popup" onClick = {() => closePopup()}>Close</button>
			  <button className="save-popup" onClick={() => submitPopup()}>Save</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Room;
