import React, { useState, useEffect } from "react";
import Nav from "../navbar/navbar";
import Swal from "sweetalert2";
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash, faSearch } from "@fortawesome/free-solid-svg-icons";

function Status() {
    const columns = ["รหัสสถานะ", "สถานะพนักงาน"];
    const [statusList, setStatusList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStatusId, setSelectedStatusId] = useState(null);
    const [mode, setMode] = useState(null); // Manage edit or delete mode

    useEffect(() => {
        fetchStatus();
    }, []);

    const fetchStatus = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/getempstatus');
            setStatusList(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const openStatusPopup = (title, submitAction, statusData = {}) => {
        Swal.fire({
            title: title,
            html: `
                <form id="manage-status-form" class="popup-form">
                    <div class="form-row">
                        <div class="form-column">
                            <label>ชื่อสถานะ</label>
                            <input type="text" name="StatusName" class="swal2-input" value="${statusData.Name || ''}" required />
                        </div>
                    </div>
                </form>
            `,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: title.includes("Edit") ? 'แก้ไข' : 'เพิ่ม',
            cancelButtonText: 'ยกเลิก',
            reverseButtons: true,
            preConfirm: () => {
                const form = document.getElementById('manage-status-form');
                const formData = new FormData(form);
                return { ID: statusData.ID, Name: formData.get('StatusName') };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                submitAction(result.value);
            }
        });
    };

    const handleAddStatus = () => {
        openStatusPopup("Manage Status", submitAddStatus);
    };

    const handleEditStatus = (status) => {
        setSelectedStatusId(status.ID);
        openStatusPopup("Edit Status", submitEditStatus, status);
    };

    const submitAddStatus = async (statusData) => {
        try {
            await axios.post('http://localhost:8080/api/addemp-status', { Name: statusData.Name });
            Swal.fire("สำเร็จ", "ข้อมูลถูกเพิ่มแล้ว", "success");
            fetchStatus();
        } catch (error) {
            console.error("Error adding status:", error);
        }
    };

    const submitEditStatus = async (statusData) => {
        try {
            await axios.put('http://localhost:8080/api/editemp-status', statusData);
            Swal.fire("สำเร็จ", "ข้อมูลถูกแก้ไขแล้ว", "success");
            fetchStatus();
            setSelectedStatusId(null);
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    const confirmDeleteStatus = (statusId) => {
        return Swal.fire({
            title: "ยืนยันการลบข้อมูล",
            text: "ข้อมูลที่ถูกลบจะไม่สามารถกู้คืนได้",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "ยืนยัน",
            cancelButtonText: "ยกเลิก",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
        }).then((result) => result.isConfirmed);
    };

    const handleDeleteStatus = async (statusId) => {
        try {
            await axios.delete('http://localhost:8080/api/delemp-status', { data: { ID: statusId } });
            Swal.fire("สำเร็จ", "ข้อมูลถูกลบแล้ว", "success");
            fetchStatus();
            setSelectedStatusId(null);
        } catch (error) {
            console.error("Error deleting status:", error);
        }
    };

    const Delete = async () => {
        if (selectedStatusId) {
            const isConfirmed = await confirmDeleteStatus(selectedStatusId);
            if (isConfirmed) {
                handleDeleteStatus(selectedStatusId);
            }
        } else {
            Swal.fire("ข้อผิดพลาด", "กรุณาเลือกสถานะที่ต้องการลบ", "error");
        }
    };

    const filteredStatuses = statusList.filter(status =>
        status.Name.includes(searchTerm)
    );

    const handleRowClick = (status) => {
        if (mode === "edit") {
            handleEditStatus(status);
        } else if (mode === "delete") {
            handleDeleteStatus(status.ID);
        }
    };

    return (
        <>
            <Nav />
            <div className="vr_select-background">
                <div className="header-room"></div>
                <div className="table-zone">
                    <div className="event-zone">
                        <div className="vr_action-buttons">
                            <button name="Add" className="event-button" onClick={handleAddStatus}>
                                <FontAwesomeIcon icon={faPlus} className="button-icon" />
                                เพิ่ม
                            </button>
                            <button name="Edit" className="event-button" onClick={() => setMode(mode === "edit" ? null : "edit")}>
                                <FontAwesomeIcon icon={faEdit} className="button-icon" />
                                {mode === "edit" ? 'ยกเลิกการแก้ไข' : 'แก้ไข'}
                            </button>
                            <button name="Delete" className="event-button" onClick={() => setMode(mode === "delete" ? null : "delete")}>
                                <FontAwesomeIcon icon={faTrash} className="button-icon" />
                                {mode === "delete" ? 'ยกเลิกการลบ' : 'ลบ'}
                            </button>
                        </div>
                        <div className="search-container">
                            <input className="input-text" type="text" placeholder="ค้นหา..." onChange={(e) => setSearchTerm(e.target.value)} />
                            <button className="input-pic">
                                <FontAwesomeIcon icon={faSearch} className="search-icon" />
                            </button>
                        </div>
                    </div>
                    <table className="vr_table">
                        <thead className="vr_table-head-row">
                            <tr>{columns.map((col, idx) => <th className="vr_table-head-cell" key={idx}>{col}</th>)}</tr>
                        </thead>
                        <tbody>
                            {filteredStatuses.map((status) => (
                                <tr
                                    className="vr_table-body-row"
                                    key={status.ID}
                                    onClick={() => handleRowClick(status)}
                                    style={{ cursor: mode ? "pointer" : "default" }}
                                >
                                    <td>{status.ID}</td>
                                    <td>{status.Name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Status;
