import React from 'react';

export const fetchAPI = async () => {
  const url = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const response = await fetch(url);
  const data = await response.json();
  const planets = data.results;
  return planets;
};

export const handleTableHeaders = () => {
  const headers = [
    'Name',
    'Rotation Period',
    'Orbital Period',
    'Diameter',
    'Climate',
    'Gravity',
    'Terrain',
    'Surface Water',
    'Population',
    'Films',
    'Created',
    'Edited',
    'URL',
  ];
  return headers.map((header, index) => (<th key={ index }>{ header }</th>));
};

export const handleObjKeys = (planet, index) => {
  const objKeysAPI = [
    'name',
    'rotation_period',
    'orbital_period',
    'diameter',
    'climate',
    'gravity',
    'terrain',
    'surface_water',
    'population',
    'films',
    'created',
    'edited',
    'url',
  ];
  return (
    <tr key={ index }>
      {
        objKeysAPI.map((header, i) => (
          <td key={ i }>
            { planet[header] }
          </td>
        ))
      }
    </tr>
  );
};

export const handleFilterByName = (planet, input) => {
  const { name } = planet;
  if (name.toLowerCase().includes(input.toLowerCase())) {
    return planet;
  }
};
