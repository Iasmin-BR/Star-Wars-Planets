import React from 'react';

const headers = {
  name: 'Name',
  rotation_period: 'Rotation Period',
  orbital_period: 'Orbital Period',
  diameter: 'Diameter',
  climate: 'Climate',
  gravity: 'Gravity',
  terrain: 'Terrain',
  surface_water: 'Surface Water',
  population: 'Population',
  films: 'Films',
  created: 'Created',
  edited: 'Edited',
  url: 'URL',
};

export const fetchAPI = async () => {
  const url = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const response = await fetch(url);
  const data = await response.json();
  const planets = data.results;
  return planets;
};

export const renderTableHeaders = () => (
  <tr>
    { Object.entries(headers).map((header, i) => (<th key={ i }>{ header[1] }</th>))}
  </tr>
);

export const renderPlanetData = (planet, index) => (
  <tr key={ index }>
    {
      Object.entries(headers).map((header, i) => (
        <td key={ i }>
          { planet[header[0]] }
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
  if (planet.population !== 'unknown') {
    if (comparison === 'maior que' && Number(planet[column]) > Number(value)) {
      return planet;
    }
    if (comparison === 'menor que' && Number(planet[column]) <= Number(value)) {
      return planet;
    }
    if (comparison === 'igual a' && Number(planet[column]) === Number(value)) {
      return planet;
    }
  }
};

export const renderColumnOptions = () => {
  const numValues = {
    population: 'Population',
    rotation_period: 'Rotation Period',
    orbital_period: 'Orbital Period',
    diameter: 'Diameter',
    surface_water: 'Surface Water',
  };

  return (
    <select data-testid="column-filter" id="column">
      {
        Object.entries(numValues).map((value, index) => (
          <option
            key={ index }
            value={ value[0] }
            id={ value[0] }
          >
            { value[0] }
          </option>
        ))
      }
    </select>
  );

  // [TODO] After conclution: change value[0] to value[1] to render the correct names in the dropdown menu;
};

export const renderComparisonMenu = () => {
  // [TODO]: After conclusion: Translate options to English;
  const options = ['maior que', 'menor que', 'igual a'];
  return (
    <select data-testid="comparison-filter" id="comparison">
      {
        options.map((option, i) => (
          <option key={ i } value={ option }>{ option }</option>))
      }
    </select>
  );
};
