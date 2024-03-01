import React from 'react';

// Haversine formula to calculate distance between two coordinates in kilometers
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the earth in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  return distance;
};

const LocationsList = ({ pins }) => {
  const athensCoords = { lat: 37.9838, lng: 23.7275 };

  // Add a distance property to each pin from Athens
  pins.forEach(pin => {
    pin.distance_from_athens_km = calculateDistance(athensCoords.lat, athensCoords.lng, pin.lat, pin.lng);
  });

  // Sort pins by distance from Athens, from farthest to closest
  const sortedPins = [...pins].sort((a, b) => b.distance_from_athens_km - a.distance_from_athens_km);

  return (
    <div className="country-list">
      <h2 style={{color: '#333'}}>Locations Visited, from Farthest to Closest to Athens 🧳</h2>
      <ul style={{listStyle: 'none', paddingLeft: '0'}}>
        {sortedPins.map((pin, index) => (
          <li key={index} style={{marginBottom: '10px', display: 'flex', alignItems: 'center'}}>
            <img src={`https://flagcdn.com/w20/${pin.flag}.png`} alt={`${pin.country} Flag`} style={{width: '20px', height: '15px', marginRight: '10px'}} />
            {pin.label} - {Math.round(pin.distance_from_athens_km)} km from Athens
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LocationsList;
