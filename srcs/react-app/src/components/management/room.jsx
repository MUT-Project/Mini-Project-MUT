import React, { useState} from "react";
import Nav from "../navbar/navbar";
import "./room.css";
import add from "../../assets/Adds.png";
import deletes from "../../assets/Delete.png";
import edits from "../../assets/Edits.png";
import search from "../../assets/Search.png";

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

          <button type="submit">
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
          <table>
            <thead>
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
			  <button className="save-popup">Save</button>
            </div>
          </div>
        )}
        {/* {Add_Index === 2 && (
          <div className="popup">
            <div className="popup-inner">
              <h2>Room</h2>
              <form>
                <table>
                  <tr>
                    <td>
                      <label> ชื่อห้อง </label>
                      <input type="text" placeholder=" " />
                    </td>
                    <td>
                      <label>ระดับห้อง </label>
                      <select>
                        <option value=""> </option>
                        <option value="option1">Normal</option>
                        <option value="option2">VIP</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label>ตึก </label>
                      <select>
                        <option value=""> </option>
                        <option value="option1">MII</option>
                        <option value="option2">MIIX</option>
                        <option value="option3">D</option>
                        <option value="option3">F</option>
                      </select>
                    </td>
                    <td>
                      <label>ชั้น </label>
                      <select>
                        <option value=""> </option>
                        <option value="option1">1</option>
                        <option value="option2">2</option>
                        <option value="option3">3</option>
                        <option value="option1">4</option>
                        <option value="option2">5</option>
                        <option value="option3">6</option>
                        <option value="option2">7</option>
                        <option value="option3">8</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label>ความจุ </label>
                      <select>
                        <option value=""> </option>
                        <option value="option1">10-15</option>
                        <option value="option2">20-30</option>
                      </select>
                    </td>
                    <td>
                      <label>สถานะห้อง </label>
                      <select>
                        <option value=""> </option>
                        <option value="option1">เปิดให้ใช้งาน</option>
                        <option value="option2">ปิดปรับปรุง</option>
                      </select>
                    </td>
                  </tr>
                </table>
              </form>
              <button onClick={Add_Close} className="close-popup">
                Close
              </button>
              <button onClick={Add_Save} className="save-popup">
                Save
              </button>
            </div>
          </div>
        )} */}
      </div>
    </>
  );
}

export default Room;
