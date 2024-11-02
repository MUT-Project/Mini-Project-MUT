import Nav from '../navbar/navbar';
import React, { useState, useEffect } from 'react';

//assets things
import "./reserve.css";
import meet1 from '../../assets/meet1.jpg';
import { Bookmark } from "lucide-react";
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';

function Reserve() {
	const navigate = useNavigate();
	const handleBookingRedirect = (room) => {
		// ส่งข้อมูล room ไปยังหน้าถัดไป
		navigate('/booking', { state: { roomData: room } });
	};

	const options = [
		{ value: 'D502', label: 'D502' },
		{ value: 'F502', label: 'F502' },
		{ value: 'K502', label: 'K502' },
		{ value: 'D503', label: 'D503' },
		{ value: 'F506', label: 'F506' },
		{ value: 'D508', label: 'D508' },
		{ value: 'F509', label: 'F509' },
	]
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
			background: '#27374e',
			display: 'flex',
			flexWrap: 'nowrap',
			borderColor: '#27374e',
			width: '10em',
			height: '3.8em',

			'&:hover': {
				backgroundColor: '#27374e'
			}
		}),
		menu: (provided) => ({
			...provided,
			width: '10em'
		}),
		placeholder: (provided) => ({
			...provided,
			color: 'white',  // Change this to your desired color
			// Optional: additional placeholder styling
			fontWeight: 'normal'
		}),
		singleValue: (provided) => ({
			...provided,
			color: 'white'  // This changes the selected value color
		}),
		input: (provided) => ({
			...provided,
			color: 'white'  // Changes the input text color
		}),
		option: (provided, state) => ({
			...provided,
			backgroundColor: state.isHovered ? '#27374e' : 'initial',
			color: state.isHovered ? 'white' : 'initial'
		})
	};

	const [isClearable] = useState(true);
	const [searchQuery, setSearchQuery] = useState("");
	const [rooms, setRooms] = useState([]);
	const [loading, setLoading] = useState(true);

	const fetchRooms = async () => {
		try {
			const response = await fetch("http://localhost:8080/api/getrooms");
			if (!response.ok) {
				throw new Error("Failed to fetch rooms");
			}
			const data = await response.json();
			setRooms(data);
			console.log(data);
		} catch (error) {
			console.error(error);
		}
	};
	useEffect(() => {
		fetchRooms();
	}, []);


	return (
		<>
			<Nav />
			<div className="bg1-res">
				<div className="container-res">
					{/*Search and Filter Section*/}
					<div className="filter-section-res">
						<div className="button-wrapper-res">
							<button className="mylists-btn-res" onClick={() => window.location.href = "/mylists"}>
								<span>My lists</span>
								<Bookmark size={20} />
							</button>
						</div>
						<form className="search-wrapper-res">
							<input
								type="text"
								placeholder="Search your room"
								className="search-input-res"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
							/>
							<button className="search-button-res" type='submit'>Search</button>
						</form>

						<div className="filter-text-res">Filter</div>
						<div className="filters-res">
							<Select
								styles={customStyles}
								options={options}
								isClearable={isClearable}
								placeholder={'Building'}
							/>
							<div className="form-floating">
								<input type="date" className="form-control" id="Date" placeholder="" value="" />
								<label className="FontColor" htmlFor="Date">Date</label>
							</div>
							<div className="form-floating">
								<input type="time" className="form-control" id="Start" placeholder="" value="" />
								<label className="FontColor" htmlFor="Start">Start Time</label>
							</div>
							<div className="form-floating">
								<input type="time" className="form-control" id="End" placeholder="" value="" />
								<label className="FontColor" htmlFor="End">End Time</label>
							</div>
							<Select
								styles={customStyles}
								options={capVal}
								isClearable={isClearable}
								placeholder={'Capacity'}
							/>
							<Select
								styles={customStyles}
								options={classVal}
								isClearable={isClearable}
								placeholder={'Class'}
							/>
						</div>
					</div>

					<div className="rooms-section-res">
						<h2 className="section-title-res">Room</h2>
						<div className="room-grid-res">
							{rooms.map((room, index) => (
								<button
									key={index}
									className="room-card-res"
									onClick={() => handleBookingRedirect({
										rnumber: room.rnumber,
										rname: room.rname,
										bname: room.bname,
										flname: room.flname,
										sname: room.sname,
										capacity: room.capacity,
										vip: room.vip
									})}
									tabIndex={0}
								>
									<div className="room-image-container-res">
										<img
											src={meet1}
											alt={`${room.bname} ${room.rnumber}`}
											className="room-image-res"
										/>
									</div>
									<div className="room-details-res">
										<h3 className="room-title-res">{`${room.bname} ${room.rname}`}</h3>
										<p className="room-info-item-res">Open : 09:00 - 18:00</p>
										<p className="room-info-item-res">
											Room Capacity : {room.capacity}
										</p>
										<p className="room-info-item-res">Class : {room.vip == 1 ? 'VIP' : 'Normal'}</p>
									</div>
								</button>
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Reserve;
