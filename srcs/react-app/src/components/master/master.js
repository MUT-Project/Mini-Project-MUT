import React, { useState, useEffect } from "react";
import "../styles/master.css";
import add from "../../assets/Adds.png";
import deletes from "../../assets/Delete.png";
import edits from "../../assets/Edits.png";
import search from "../../assets/Search.png";

function Master() {
  const [page_id, setPageId] = useState(0);
  const [Is_underlinedId, setUnderlinedId] = useState(null);
  const [columns, setColumns] = useState([]); // เก็บข้อมูลคอลัมน์ใน <thead>
  const [Add_Index, setAdd] = useState(0);

  const Add_Close = () => {
    setAdd(0);
  };
  const Add_Save = () => {
    setAdd(0);
  };

  const Add_Open = () => {
    if (parseInt(page_id) === 1) setAdd(1);
    else if (parseInt(page_id) === 2) setAdd(2);
    else if (parseInt(page_id) === 3) setAdd(3);
    else if (parseInt(page_id) === 4) setAdd(4);
  };

  const Page_Click = (id) => {
    setUnderlinedId(id);
    setPageId(id);

    if (id === 1) {
      const newColumns = ["รหัสแผนก", "ชื่อแผนก"];
      setColumns(newColumns);
    } else if (id === 2) {
      const newColumns = [
        "รหัสตำแหน่ง",
        "ชื่อตำแหน่ง",
        "เลขสิทธิ์การเข้าใช้งาน",
      ];
      setColumns(newColumns);
    } else if (id === 3) {
      const newColumns = ["รหัสตึก", "ชื่อตึก", "จำนวนชั้น"];
      setColumns(newColumns);
    } else {
      const newColumns = ["รหัสสถานะ", "ชื่อสถานะ"];
      setColumns(newColumns);
    }
  };

  useEffect(() => {
    Page_Click(1);
  }, []);

  return (
    <div className="container">
      <div className="selection-zone">
        <p
          className="Department"
          onClick={() => Page_Click(1)}
          style={{
            textDecoration: Is_underlinedId === 1 ? "underline" : "none",
            cursor: "pointer",
          }}
        >
          Department
        </p>

        <p
          className="Position"
          onClick={() => Page_Click(2)}
          style={{
            textDecoration: Is_underlinedId === 2 ? "underline" : "none",
            cursor: "pointer",
          }}
        >
          Position
        </p>

        <p
          className="Building"
          onClick={() => Page_Click(3)}
          style={{
            textDecoration: Is_underlinedId === 3 ? "underline" : "none",
            cursor: "pointer",
          }}
        >
          Building
        </p>

        <p
          className="Status"
          onClick={() => Page_Click(4)}
          style={{
            textDecoration: Is_underlinedId === 4 ? "underline" : "none",
            cursor: "pointer",
          }}
        >
          Status
        </p>
      </div>

      <div className="event-zone">
        <button type="submit" onClick={() => Add_Open()}>
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

      {/* <div className='searchbox'>
                    <input type='text' placeholder='search something...'>

                    </input>
                </div> */}

      <div className="table-zone">
        <table>
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={index}>{column}</th>
              ))}
            </tr>
          </thead>
        </table>
      </div>

      {Add_Index === 1 && (
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
            <button onClick={Add_Close} className="close-popup">
              Close
            </button>
            <button onClick={Add_Save} className="save-popup">
              Save
            </button>
          </div>
        </div>
      )}

{Add_Index === 2 && (
  <div className="popup">
    <div className="popup-position">
      <h2>Position</h2>
      <form>
        <table>
          <tr>
            <td>
            <div className="input-container">
              <label>ชื่อตำแหน่ง</label>
              <input type="text" placeholder=" " />
              </div>
            </td>
          </tr>
          <tr>
            <td>
            <div className="input-container">
              <div className="checkbox-group">
              <label>สิทธิ์การเข้าใช้งาน</label>
                <div className="checkbox-column">
                  <label><input type="checkbox" name="" value="1" /> การจอง</label>
                  <label><input type="checkbox" name="" value="2" /> จัดการ</label>
                  <label><input type="checkbox" name="" value="3" /> ข้อมูลพื้นฐาน</label>
                </div>
                <div className="checkbox-column">
                  <label><input type="checkbox" name="" value="4" /> ตรวจสอบประวัติ</label>
                  <label><input type="checkbox" name="" value="5" /> รายงาน</label>
                  <label><input type="checkbox" name="" value="6" /> อนุมัติห้อง</label>
                </div>
              </div>
              </div>
            </td>
          </tr>
        </table>
      </form>
      <div className="buttons">
        <button onClick={Add_Close} className="close-popup">Close</button>
        <button onClick={Add_Save} className="save-popup">Save</button>
      </div>
    </div>
  </div>
)}


      {Add_Index === 3 && (
        <div className="popup">
          <div className="popup-inner">
            <h2>Building</h2>
            <form>
              <table>
              <tr>
                  <td>
                    <label>ชื่อตึก </label>
                    <input type="text" placeholder=" " />
                  </td>
                  <td>
                    <label>จำนวนชั้น </label>
                    <input type="text" placeholder=" " />
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
      )}

      {Add_Index === 4 && (
        <div className="popup">
          <div className="popup-inner">
            <h2>Status</h2>
            <form>
              <table>
                <tr>
                  <td>
                    <label>ชื่อสถานะ </label>
                    <input type="text" placeholder=" " />
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
      )}
    </div>
  );
}

export default Master;
