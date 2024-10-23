import React, { useState } from "react";
import "../styles/verify.css";

const Verify = () => {
    const [verifyList] = useState([
      // Sample data
      {},
      {},
      {},
      {},
      {}
    ]);
  
    return (
      <div className="booking-container">
        <div className="table-container">
          <div className="table-header">
            <h2 className="table-title">Booking VIP Lists</h2>
          </div>
          <table>
            <thead>
              <tr>
                <th>เลขที่รายการ</th>
                <th>ห้อง</th>
                <th>รายละเอียดการจอง</th>
                <th>วันเดือนปี</th>
                <th>เวลา</th>
              </tr>
            </thead>
            <tbody>
              {verifyList.map((_, index) => (
                <tr key={index}>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-cancel">
                        Cancel
                      </button>
                      <button className="btn-verify">
                        Verify
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

export default Verify;