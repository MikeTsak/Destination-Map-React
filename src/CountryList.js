import React from 'react';

const CountryList = ({ pins }) => {
  // First, create a map to hold the unique countries and their flag codes
  const uniqueCountriesMap = new Map();

  pins.forEach(pin => {
    if (!uniqueCountriesMap.has(pin.country)) {
      uniqueCountriesMap.set(pin.country, pin.flag);
    }
  });

  // Then, convert the map back into an array of objects for rendering
  const countriesWithFlags = Array.from(uniqueCountriesMap, ([country, flagCode]) => ({
    country,
    flagCode
  }));

  // Sort the countries alphabetically
  countriesWithFlags.sort((a, b) => a.country.localeCompare(b.country));

  // Function to generate flag URL
  const flagUrl = (countryCode) => `https://flagcdn.com/${countryCode.toLowerCase()}.svg`;

  return (
    <div className="country-list">
      <h2 style={{color: '#333'}}>Countries Visited ✈️</h2>
      <ul style={{listStyle: 'none', paddingLeft: '0'}}>
        {countriesWithFlags.map((item, index) => (
          <li key={index} style={{marginBottom: '10px', display: 'flex', alignItems: 'center'}}>
            <img src={flagUrl(item.flagCode)} alt={`${item.country} Flag`} style={{width: '32px', height: '20px', marginRight: '10px'}} />
            {item.country}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CountryList;
