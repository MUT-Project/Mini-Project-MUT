import React, { useState } from 'react';
import { Search } from 'lucide-react';
import "../styles/booking.css";

const RoomBooking = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const rooms = Array(6).fill({
    id: 'K102',
    building: 'Building K',
    openHours: 'Monday - Friday',
    capacity: '7 - 8 People',
    class: 'Normal',
    image: '/api/placeholder/400/250'
  });

  const handleRoomClick = (room) => {
    console.log('Room selected:', room);
  };

  return (
    <div className="container">
      {/* Search and Filter Section */}
      <div className="filter-section">
        <div className="search-wrapper">
          <input
            type="text"
            placeholder="Search your room"
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search-button">
            Search
          </button>
          <button className="my-lists-button">
            My lists
          </button>
        </div>
        
        <div className="filter-text">Filter</div>
        <div className="filters">
          <select className="filter-select">
            <option value="">Building</option>
          </select>
          <select className="filter-select">
            <option value="">Date</option>
          </select>
          <select className="filter-select">
            <option value="">Time Slot</option>
          </select>
          <select className="filter-select">
            <option value="">Room Capacity</option>
          </select>
          <select className="filter-select">
            <option value="">Class</option>
          </select>
        </div>
      </div>

      <div className="rooms-section">
        <h2 className="section-title">Room</h2>
        <div className="room-grid">
          {rooms.map((room, index) => (
            <div 
              key={index} 
              className="room-card"
              onClick={() => handleRoomClick(room)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleRoomClick(room);
                }
              }}
            >
              <div className="room-image-container">
                <img
                  src={room.image}
                  alt={`${room.building} ${room.id}`}
                  className="room-image"
                />
              </div>
              <div className="room-details">
                <h3 className="room-title">{`${room.building} ${room.id}`}</h3>
                <p className="room-info-item">Open : {room.openHours}</p>
                <p className="room-info-item">Room Capacity : {room.capacity}</p>
                <p className="room-info-item">Class : {room.class}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoomBooking;
