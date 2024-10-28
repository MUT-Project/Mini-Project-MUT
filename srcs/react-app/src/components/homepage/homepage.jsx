// import React from 'react'
// import Nav from '../navbar/navbar';

// function Home() {
// 	return (
// 		<>
// 			<div>
// 				<Nav />
// 			</div>
// 		</>
// 	)
// }

// export default Home;

import React, { useEffect, useState } from "react";
import Nav from "../navbar/navbar";

function Home() {
    const [users, setUsers] = useState([]);
    const uniqueUsers = [
        ...new Map(users.map((user) => [user.BNUMBER, user])).values(),
    ];

    useEffect(() => {
        // รีเซ็ต users เป็นอาเรย์ว่างก่อนดึงข้อมูลใหม่
        setUsers([]);

        fetch("http://localhost:8080/api/users")
            .then((response) => response.json())
            .then((data) => setUsers(data))
            .catch((error) => console.error("Error fetching users:", error));
    }, []);

    return (
        <>
            <div>
                <Nav />
            </div>
            <div className="container mt-4">
                <h1>User List</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>BNUMBER</th>
                            <th>BNAME</th>
                        </tr>
                    </thead>
                    <tbody>
                        {uniqueUsers.map((user) => (
                            <tr key={user.BNUMBER}>
                                <td>{user.BNUMBER}</td>
                                <td>{user.BNAME}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Home;

// import React, { useState } from 'react';
// import Nav from '../navbar/navbar';

// function Home() {
//     const [users, setUsers] = useState([]);
//     const [newUser, setNewUser] = useState({ BNUMBER: '', BNAME: '' });

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setNewUser({ ...newUser, [name]: value });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // ส่งข้อมูลไปยัง API
//         fetch('http://localhost:8080/api/users', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(newUser),
//         })
//         .then(response => response.json())
//         .then(data => {
//             console.log('Success:', data);
//             // อัปเดต state ผู้ใช้ใหม่
//             setUsers([...users, newUser]);
//             // รีเซ็ตฟอร์ม
//             setNewUser({ BNUMBER: '', BNAME: '' });
//         })
//         .catch((error) => {
//             console.error('Error:', error);
//         });
//     };

//     return (
//         <>
//             <div>
//                 <Nav />
//             </div>
//             <div className="container mt-4">
//                 <h1>User List</h1>
//                 <form onSubmit={handleSubmit}>
//                     <input
//                         type="text"
//                         name="BNUMBER"
//                         value={newUser.BNUMBER}
//                         onChange={handleInputChange}
//                         placeholder="BNUMBER"
//                         required
//                     />
//                     <input
//                         type="text"
//                         name="BNAME"
//                         value={newUser.BNAME}
//                         onChange={handleInputChange}
//                         placeholder="BNAME"
//                         required
//                     />
//                     <button type="submit">Add User</button>
//                 </form>
//                 <table className="table mt-4">
//                     <thead>
//                         <tr>
//                             <th>BNUMBER</th>
//                             <th>BNAME</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {users.map(user => (
//                             <tr key={user.BNUMBER}>
//                                 <td>{user.BNUMBER}</td>
//                                 <td>{user.BNAME}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </>
//     );
// }

// export default Home;
