import React from 'react';
import MutLogo from '../../assets/homepage/logo-full.png';

const SearchCard = () => {
	return (
		<div className="search-card">
			<div className='logo-img'>
				<img src={MutLogo} alt="MUT Logo" />
			</div>
			<div className="search-form">
				<input type="text" className="room-input" placeholder="Choose your room" />
				<div className="search-options">
					<input type="date" placeholder="Start date" />
					<input type="time" placeholder="Start time" />
					<input type="time" placeholder="End time" />
					<input type="number" placeholder="Room capacity" />
					<input type="text" placeholder="Class" />
				</div>
				<button>Find</button>
			</div>
		</div>
	);
};

const SearchForm = () => {
	return (
		<div className="room-search-page">
			<SearchCard />
		</div>
	);
};

export default SearchForm;
