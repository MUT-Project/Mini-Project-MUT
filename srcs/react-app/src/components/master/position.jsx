import React, { useState, useEffect } from "react";
import Nav from "../navbar/navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faSearch } from '@fortawesome/free-solid-svg-icons';
import Swal from "sweetalert2";
import axios from 'axios';

function Position() {
    const columns = ["รหัสตำแหน่ง", "ชื่อตำแหน่ง", "สิทธิ์การเข้าใช้"];
    const [positionList, setPositionList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedPositionId, setSelectedPositionId] = useState(null);
    const [mode, setMode] = useState(null); // สำหรับจัดการโหมดการแก้ไขหรือลบ

    useEffect(() => {
        fetchPositions();
    }, []);

    const fetchPositions = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/getposition');
            setPositionList(response.data);
        } catch (error) {
            console.error("Error fetching positions:", error);
        }
    };

    const openPositionPopup = (title, submitAction, positionData = {}) => {
        Swal.fire({
            title: title,
            html: `
                <form id="manage-position-form" class="popup-form">
                    <div class="form-row">
                        <div class="form-column">
                            <label>ชื่อตำแหน่ง</label>
                            <input type="text" name="PositionName" class="swal2-input" value="${positionData.Name || ''}" required />
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-column">
                            <label>สิทธิ์การเข้าใช้:</label>
                        </div>
                        <div class="form-column">
                            <input type="checkbox" name="book" ${positionData.Accessno?.[0] === "1" ? "checked" : ""} value="1">
                            <label>การจอง</label>
                        </div>
                        <div class="form-column">
                            <input type="checkbox" name="checkHistory" ${positionData.Accessno?.[1] === "1" ? "checked" : ""} value="1">
                            <label>เช็คประวัติ</label>
                        </div>
                    </div>
                    <div class="form-row">
					 <div class="form-column"></div>
                        <div class="form-column">
                            <input type="checkbox" name="manage" ${positionData.Accessno?.[2] === "1" ? "checked" : ""} value="1">
                            <label>การจัดการ</label>
                        </div>
                        <div class="form-column">
                            <input type="checkbox" name="basicInfo" ${positionData.Accessno?.[3] === "1" ? "checked" : ""} value="1">
                            <label>ข้อมูลพื้นฐาน</label>
                        </div>
                    </div>
                    <div class="form-row">
					<div class="form-column"></div>
                        <div class="form-column">
                            <input type="checkbox" name="report" ${positionData.Accessno?.[4] === "1" ? "checked" : ""} value="1">
                            <label>รายงาน</label>
                        </div>
                        <div class="form-column">
                            <input type="checkbox" name="approveRoom" ${positionData.Accessno?.[5] === "1" ? "checked" : ""} value="1">
                            <label>อนุมัติห้อง</label>
                        </div>
                    </div>
                </form>
            `,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: title.includes("Edit") ? 'แก้ไข' : 'เพิ่ม',
            cancelButtonText: 'ยกเลิก',
            //reverseButtons: true,
            preConfirm: () => {
                const form = document.getElementById('manage-position-form');
                const formData = new FormData(form);
                const positionName = formData.get('PositionName');
                const permissions = [
                    formData.get('book') ? '1' : '0',
                    formData.get('checkHistory') ? '1' : '0',
                    formData.get('manage') ? '1' : '0',
                    formData.get('basicInfo') ? '1' : '0',
                    formData.get('report') ? '1' : '0',
                    formData.get('approveRoom') ? '1' : '0'
                ].join('');
                return { ID: positionData.ID, Name: positionName, Accessno: permissions };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                submitAction(result.value);
            }
        });
    };

    const handleAddPosition = () => {
        openPositionPopup("Manage Position", submitAddPosition);
    };

    const handleEditPosition = (position) => {
        openPositionPopup("Edit Position", submitEditPosition, position);
    };

    const submitAddPosition = async (positionData) => {
        try {
            await axios.post('http://localhost:8080/api/addposition', {
                Name: positionData.Name,
                Accessno: positionData.Accessno
            });
            Swal.fire("สำเร็จ", "ข้อมูลถูกเพิ่มแล้ว", "success");
            fetchPositions();
        } catch (error) {
            console.error("Error adding position:", error);
        }
    };

    const submitEditPosition = async (positionData) => {
        try {
            await axios.put('http://localhost:8080/api/editposition', positionData);
            Swal.fire("สำเร็จ", "ข้อมูลถูกแก้ไขแล้ว", "success");
            fetchPositions();
        } catch (error) {
            console.error("Error updating position:", error);
        }
    };

    const handleDeletePosition = async (positionId) => {
        const isConfirmed = await Swal.fire({
            title: "ยืนยันการลบข้อมูล",
            text: "ข้อมูลที่ถูกลบจะไม่สามารถกู้คืนได้",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "ยืนยัน",
            cancelButtonText: "ยกเลิก"
        }).then(result => result.isConfirmed);

        if (isConfirmed) {
            try {
                await axios.delete('http://localhost:8080/api/delposition', { data: { ID: positionId } });
                Swal.fire("สำเร็จ", "ข้อมูลถูกลบแล้ว", "success");
                fetchPositions();
            } catch (error) {
                console.error("Error deleting position:", error);
            }
        }
    };

    const filteredPositions = positionList.filter(position =>
        position.Name.includes(searchTerm)
    );

    const handleRowClick = (position) => {
        if (mode === "edit") {
            handleEditPosition(position);
        } else if (mode === "delete") {
            handleDeletePosition(position.ID);
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
                            <button name="Add" className="event-button" onClick={handleAddPosition}>
                                <FontAwesomeIcon icon={faPlus} className="button-icon" />
                                Add
                            </button>
                            <button name="Edit" className="event-button" onClick={() => setMode(mode === "edit" ? null : "edit")}>
                                <FontAwesomeIcon icon={faEdit} className="button-icon" />
                                {mode === "edit" ? 'Cancel Edit' : 'Edit'}
                            </button>
                            <button name="Delete" className="event-button" onClick={() => setMode(mode === "delete" ? null : "delete")}>
                                <FontAwesomeIcon icon={faTrash} className="button-icon" />
                                {mode === "delete" ? 'Cancel Delete' : 'Delete'}
                            </button>
                        </div>
                        <div className="search-container">
                            <input className="input-text" type="text" placeholder="Search..." onChange={(e) => setSearchTerm(e.target.value)} />
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
                            {filteredPositions.map((position) => (
                                <tr
                                    className="vr_table-body-row"
                                    key={position.ID}
                                    onClick={() => handleRowClick(position)}
                                    style={{ cursor: mode ? "pointer" : "default" }}
                                >
                                    <td>{position.ID}</td>
                                    <td>{position.Name}</td>
                                    <td>{position.Accessno}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Position
