import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const Map = ({ pins, countriesGeoJSON, routes, showRoutes }) => {
  // Function to determine if a country has been visited based on the pins
  const isCountryVisited = (countryName) => {
    return pins.some(pin => pin.country === countryName);
  };

  // Styles for the GeoJSON layer
  const countryStyle = (feature) => {
    return {
      fillColor: isCountryVisited(feature.properties.name) ? "#0000FF" : "#cccccc", // Blue for visited, gray for others
      weight: 2,
      opacity: 1,
      color: 'blue', // Outline color remains blue for visibility
      fillOpacity: isCountryVisited(feature.properties.name) ? 0.5 : 0.2,
    };
  };

  // Function to convert city names to LatLng points
  const getLatLngFromCityName = (cityName) => {
    const pin = pins.find(pin => pin.label === cityName);
    return pin ? [pin.lat, pin.lng] : null;
  };

  // Function to get color based on the mode of transportation
  const getColorByMode = (mode) => {
    switch (mode) {
      case 'airplane':
        return 'blue';
      case 'train':
        return 'green';
      case 'car':
        return 'red';
      default:
        return 'gray'; // Default color
    }
  };

  // Convert routes to an array of Polyline components
  const routePolylines = routes.map((route, index) => {
    const fromLatLng = getLatLngFromCityName(route.from);
    const toLatLng = getLatLngFromCityName(route.to);
    if (!fromLatLng || !toLatLng) return null; // Skip if any LatLng is not found

    return (
      <Polyline
        key={index}
        positions={[fromLatLng, toLatLng]}
        color={getColorByMode(route.mode)}
      />
    );
  });

  return (
    <MapContainer center={[37.9838, 23.7275]} zoom={3.45} scrollWheelZoom={false} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />

{pins.map((pin, index) => (
  <Marker key={index} position={[pin.lat, pin.lng]} icon={new L.Icon({
    iconUrl: 'https://i.miketsak.gr/i/map-marker-2-512.png',
    iconSize: [25, 25],
    iconAnchor: [12, 12],
    popupAnchor: [1, -34],
  })}>
    <Popup>
      <div className="popup-content">
        <div className="popup-image-container">
          <img 
            src={`https://map.miketsak.gr/img/${pin.image}.jpg`} 
            alt={pin.label} 
          />
        </div>
        <span className="popup-label">{pin.label}</span>
        <span className="popup-country">{pin.country}</span>
        <img 
          src={`https://flagcdn.com/w20/${pin.flag}.png`} 
          alt={`${pin.country} Flag`} 
          style={{width: '20px', height: '15px', marginTop: '5px', border: '1px solid #333'}}
        />
      </div>
    </Popup>
  </Marker>
))}


      <GeoJSON data={countriesGeoJSON} style={countryStyle} />
      {showRoutes && routePolylines}
    </MapContainer>
  );
};

export default Map;
