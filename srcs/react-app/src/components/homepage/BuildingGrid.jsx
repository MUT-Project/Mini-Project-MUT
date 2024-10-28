import React from "react";
import buildingImg from "../../assets/homepage/building.png";

const BuildingGrid = () => {
	return (
		<div>
			<p className=".bd_building-card-p">Buildings</p>
			<div className="bd_building-grid">
				<div className="bd_building-card">
					<img src={buildingImg} alt="Building Code:Chicken" />
					<h3>Building Code:Chicken</h3>
				</div>
				<div className="bd_building-card">
					<img src={buildingImg} alt="Building D" />
					<h3>Building D</h3>
				</div>
				<div className="bd_building-card">
					<img src={buildingImg} alt="Building T-ONE" />
					<h3>Building T-ONE</h3>
				</div>
				<div className="bd_building-card">
					<img src={buildingImg} alt="Building SQUARE" />
					<h3>Building SQUARE</h3>
				</div>
				<div className="bd_building-card">
					<img src={buildingImg} alt="Building F" />
					<h3>Building F</h3>
				</div>
				<div className="bd_building-card">
					<img src={buildingImg} alt="Building MII" />
					<h3>Building MII</h3>
				</div>
				<div className="bd_building-card">
					<img src={buildingImg} alt="Building MIIX" />
					<h3>Building MIIX</h3>
				</div>
				<div className="bd_building-card">
					<img src={buildingImg} alt="Building K" />
					<h3>Building K</h3>
				</div>
			</div>
		</div>
	);
};

export default BuildingGrid;
