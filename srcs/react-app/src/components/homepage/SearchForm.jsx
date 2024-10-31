import React, { useState } from 'react';
import MutLogo from '../../assets/homepage/logo-full.png';

import Select from 'react-select';

const SearchCard = () => {
	const capVal = [
		{ value: '1', label: '1' },
		{ value: '2', label: '2' },
		{ value: '3', label: '3' }
	]
	const classVal = [
		{ value: 'Normal', label: 'Normal' },
		{ value: 'Vip', label: 'Vip' }
	]

	const customStyles = {
		control: (provided) => ({
			...provided,
			background: 'white',
			display: 'flex',
			flexWrap: 'nowrap',
			borderColor: '#27374e',
			width: '10em',
			height: '50px'
		}),
		menu: (provided) => ({
			...provided,
			width: '10em'
		}),
		placeholder: (provided) => ({
			...provided,
			color: '#8f8f8f',  // Change this to your desired color
			// Optional: additional placeholder styling
			fontWeight: 'normal'
		}),
		singleValue: (provided) => ({
			...provided,
			color: '#8f8f8f'  // This changes the selected value color
		}),
		input: (provided) => ({
			...provided,
			color: '#8f8f8f'  // Changes the input text color
		})
	};
	const [isClearable] = useState(true);

	return (
		<div className="search-card">
			<div className='logo-img'>
				<img src={MutLogo} alt="MUT Logo" />
			</div>
			<div className="search-form">
				<input type="text" className="room-input" placeholder="Choose your room" />
				<div className="search-options">
					<div className="custom-date-input2">
						<label className="FontColor2" htmlFor="Date">Date</label>
						<input type="date" className="form-control" id="Date" />
						<label for="Date" class="date-icon2">📅</label>
					</div>
					<div className="custom-date-input">
						<label className="FontColor2" htmlFor="Start">Start Time</label>
						<input type="time" className="form-control" id="Start" />
						<label for="time" class="time-icon2">🕒</label>
					</div>
					<div className="custom-date-input2">
						<label className="FontColor2" htmlFor="End">End Time</label>
						<input type="time" className="form-control" id="End" />
						<label for="time" class="time-icon2">🕒</label>
					</div>
					<div className="custom-date-input2">
						<label className="FontColor2">Capacity</label>
						<Select
							styles={customStyles}
							options={capVal}
							isClearable={isClearable}
						/>
					</div>
					<div className="custom-date-input2">
						<label className="FontColor2">Class</label>
						<Select
							styles={customStyles}
							options={classVal}
							isClearable={isClearable}
						/>
					</div>
				</div>
				<button className='find-button'>FIND</button>
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
