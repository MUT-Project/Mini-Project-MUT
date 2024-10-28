import React from 'react';
import roomImg from '../../assets/homepage/room.png';

const RoomGrid = () => {
	return (
		<div>
			<p>Rooms</p>
			<div className="r_room-grid">
				<div className="r_room-card">
					<img src={roomImg} alt="Building D D504" />
					<div className="r_room-info">
						<h3>Building D</h3>
						<p>D504</p>
					</div>
				</div>
				<div className="r_room-card">
					<img src={roomImg} alt="Building F F303" />
					<div className="r_room-info">
						<h3>Building F</h3>
						<p>F303</p>
					</div>
				</div>
				<div className="r_room-card">
					<img src={roomImg} alt="Building K K102" />
					<div className="r_room-info">
						<h3>Building K</h3>
						<p>K102</p>
					</div>
				</div>
				<div className="r_room-card">
					<img src={roomImg} alt="Building MII MII208" />
					<div className="r_room-info">
						<h3>Building MII</h3>
						<p>MII208</p>
					</div>
				</div>
				<div className="r_room-card">
					<img src={roomImg} alt="Building Code:Chicken CC810" />
					<div className="r_room-info">
						<h3>Building Code:Chicken</h3>
						<p>CC810</p>
					</div>
				</div>
				<div className="r_room-card">
					<img src={roomImg} alt="Building T-ONE T709" />
					<div className="r_room-info">
						<h3>Building T-ONE</h3>
						<p>T709</p>
					</div>
				</div>
				<div className="r_room-card">
					<img src={roomImg} alt="Building SQUARE S106" />
					<div className="r_room-info">
						<h3>Building SQUARE</h3>
						<p>S106</p>
					</div>
				</div>
				<div className="r_room-card">
					<img src={roomImg} alt="Building MIIX MIIX302" />
					<div className="r_room-info">
						<h3>Building MIIX</h3>
						<p>MIIX302</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RoomGrid;
