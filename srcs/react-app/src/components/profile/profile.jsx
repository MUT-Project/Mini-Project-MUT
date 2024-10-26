import React, { useEffect } from "react";
import Nav from "../navbar/navbar";
import "./profile.css";

function Profile() {
  // useEffect(() => {

  // 	document.body.style.backgroundColor = 'rgb(155, 155, 155)'; // เปลี่ยนสี background

  // 	return () => {
  // 	  document.body.style.backgroundColor = ''; // รีเซ็ตสีเมื่อออกจากหน้านี้
  // 	};
  //   }, []);

  return (
    <>
      <Nav />
      <body>
        <div className="bgprofile">
          <div className="container-profile">
            <div className="top_text-profile">
              <b>Profile Infomation</b>
            </div>
            <div className="head-profile">
              <div className="head_img-profile"></div>
              <p className="head_name-profile">UTORU</p>
            </div>
            <div className="body-profile">
              <div className="body_left-profile">
                <div className="body_name-profile">
                  <p>FristName :</p>
                  <p className="body_name_input-profile">UTORU</p>
                </div>
                <div className="body_name-profile">
                  <p>Department :</p>
                  <p className="body_name_input-profile">MII</p>
                </div>
                <div className="body_name-profile">
                  <p>Position :</p>
                  <p className="body_name_input-profile">Tester</p>
                </div>
              </div>
              <div className="body_right-profile">
                <div className="body_name-profile">
                  <p>LastName :</p>
                  <p className="body_name_input-profile">Cy</p>
                </div>
                <div className="body_name-profile">
                  <p>Point :</p>
                  <p className="body_name_input-profile">3</p>
                </div>
                <div className="body_name-profile">
                  <p>Status :</p>
                  <p className="body_name_input-profile">Working</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </>
  );
}

export default Profile;
