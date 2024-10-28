import React, {useState} from "react";
import Nav from "../navbar/navbar";
import "./position.css";
import add from "../../assets/Adds.png";
import deletes from "../../assets/Delete.png";
import edits from "../../assets/Edits.png";
import search from "../../assets/Search.png";

function Position() {
  const columns = ["รหัสสถานะ", "ชื่อสถานะ"];
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
            <h2 className="popup_title">Status</h2>
            <form>
              <table>
                <tr>
                  <td>
                    <label className="popup_label">ชื่อสถานะ </label>
                    <input type="text" placeholder=" " />
                  </td>
                </tr>
              </table>
            </form>
            <button onClick={() => closePopup()} className="close-popup">
              Close
            </button>
            <button className="save-popup">
              Save
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Position;
