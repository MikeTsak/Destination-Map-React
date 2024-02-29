import React, { useState, useEffect } from 'react';
import Map from './Map';
import Statistics from './Statistics';
import CountryList from './CountryList';

const App = () => {
  const [pins, setPins] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [showRoutes, setShowRoutes] = useState(true);

  useEffect(() => {
    // Fetch the pins data
    fetch('https://raw.githubusercontent.com/MikeTsak/Destination-Map/main/pins.json')
      .then(response => response.json())
      .then(data => setPins(data));

    // Fetch the travel routes data
    fetch('https://raw.githubusercontent.com/MikeTsak/Destination-Map/main/routes.json') // Adjust the path as necessary
      .then(response => response.json())
      .then(data => setRoutes(data));
  }, []);

  console.log(pins);
  console.log(routes);
  // Function to toggle the visibility of routes
  const toggleRoutes = () => {
    setShowRoutes(!showRoutes);
  };

  return (
<div>
  <div className="map-container">
    <Map pins={pins} routes={routes} showRoutes={showRoutes}/>
  </div>

  <button className="toggle-routes-button" onClick={toggleRoutes}>
    {showRoutes ? 'Hide Routes' : 'Show Routes'}
  </button>

  {/* Ensure Statistics and CountryList are styled or positioned as needed */}
  <div className="statistics">
    <Statistics pins={pins} />
  </div>
  <div className="country-list">
    <CountryList pins={pins} />
  </div>
</div>

  );
};

export default App;
