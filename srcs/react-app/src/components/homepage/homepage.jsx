import React from 'react';
import './RoomGrid.css'
import './BuildingGrid.css'
import './SearchForm.css'
import SearchForm from './SearchForm';
import BuildingGrid from './BuildingGrid';
import RoomGrid from './RoomGrid';
import Navbar from '../navbar/navbar';
import Footer from './Footer';

const HomePage = () => {
	return (
		<>
			<div className="home-page">
				<Navbar />
				<SearchForm />
				<BuildingGrid />
				<RoomGrid />
				<Footer />
			</div>
		</>
	);
};

export default HomePage;
