import React, { useEffect } from "react";
import Nav from "../navbar/navbar";
import "./profile.css";

function Profile() {
	const Profile = {
		Fname: "Chayut",
		Lname: "Jiambanjong",
		department: "MII",
		point: 0,
		position: "MII",
		status: "Working",
	};

	const { Fname, Lname, department, point, position, status } = Profile;

	return (
		<>
			<Nav />
			<div className="bgprofile">
				<div className="container-profile">
					<div className="top_text-profile">
						<b>Profile Information</b>
					</div>
					<div className="head-profile">
						<div className="head_img-profile"></div>
						<p className="head_name-profile">{Fname} {Lname}</p>
					</div>
					<div className="body-profile">
						<div className="body_left-profile">
							<ProfileInfo label="First Name" value={Fname} />
							<ProfileInfo label="Department" value={department} />
							<ProfileInfo label="Position" value={position} />
						</div>
						<div className="body_right-profile">
							<ProfileInfo label="Last Name" value={Lname} />
							<ProfileInfo label="Point" value={point} />
							<ProfileInfo label="Status" value={status} />
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

const ProfileInfo = ({ label, value }) => (
	<div className="body_name-profile">
		<p>{label} :</p>
		<p className="body_name_input-profile">{value}</p>
	</div>
);

export default Profile;
