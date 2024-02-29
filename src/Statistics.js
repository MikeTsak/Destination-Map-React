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


const Statistics = ({ pins }) => {
  const athens = { lat: 37.9838, lng: 23.7275 };
  const totalCountries = new Set(pins.map(pin => pin.country)).size;
  const totalCities = pins.length;
  const totalWorldCountries = 195;
  const visitedPercentage = ((totalCountries / totalWorldCountries) * 100).toFixed(2);

    // Calculate total distance traveled from Athens to each city and back
    const totalDistanceTraveled = pins.reduce((acc, pin) => {
      return acc + (calculateDistance(athens.lat, athens.lng, pin.lat, pin.lng) * 2); // Multiplied by 2 for return distance
    }, 0).toFixed(2)

  return (
    <div className="statistics">
      <h2>Travel Statistics 🌍</h2>
      <p>Total Countries Visited: {totalCountries} out of {totalWorldCountries}</p>
      <p>Total Cities Visited: {totalCities}</p>
      <p>World Visited: {visitedPercentage}%</p>
      <p>Total Distance Traveled: {totalDistanceTraveled} km</p>
    </div>
  );
};

export default Statistics;