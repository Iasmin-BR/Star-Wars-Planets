import React from 'react';

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

export const fetchAPI = async () => {
  const url = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const response = await fetch(url);
  const data = await response.json();
  const planets = data.results;
  return planets;
};

export const handleTableHeaders = () => {
  console.log('[Dúvida Lint : arrow function sem return]');
  return (
    headers.map((header, index) => (<th key={ index }>{ header }</th>))
  );
};

export const handleObjKeys = (planet, index) => (
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

export const handleFilterByName = (planet, input) => {
  const { name } = planet;
  if (name.toLowerCase().includes(input.toLowerCase())) {
    return planet;
  }
};

export const handleFilterByValues = (planet, input) => {
  const { column, comparison, value } = input[0];
  if (comparison === '') { // Initial value empty: this condition leads to no initial filtering;
    return planet;
  }
  if (comparison === 'maior que' && Number(planet[column]) > Number(value)) {
    return planet;
  }
  if (comparison === 'menor que' && Number(planet[column]) < Number(value)) {
    return planet;
  }
  if (comparison === 'igual a' && Number(planet[column]) === Number(value)) {
    return planet;
  }
};

export const handleColumnOptions = () => {
  const numValues = {
    population: 'Population',
    rotation_period: 'Rotation Period',
    orbital_period: 'Orbital Period',
    diameter: 'Diameter',
    surface_water: 'Surface Water',
  };

  return Object.entries(numValues).map((value, index) => (
    <option
      key={ index }
      value={ value[0] }
      id={ value[0] }
    >
      { value[0] }
    </option>
  ));
  // [TODO] After conclution: change value[0] to value[1] to render the correct names in the dropdown menu;
};
