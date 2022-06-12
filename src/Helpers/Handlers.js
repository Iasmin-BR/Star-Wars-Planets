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

export const numericFilters = {
  population: 'Population',
  rotation_period: 'Rotation Period',
  orbital_period: 'Orbital Period',
  diameter: 'Diameter',
  surface_water: 'Surface Water',
};

export const fetchAPI = async () => {
  const url = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const response = await fetch(url);
  const data = await response.json();
  const planets = data.results;
  return planets;
};

export const renderColumnOptions = (filterOptions) => {
  const columnOptions = (
    <select data-testid="column-filter" id="column">
      {Object.entries(filterOptions).map((value, index) => (
        <option key={ index } value={ value[0] } id={ value[0] }>
          { value[0] }
        </option>
      ))}
    </select>
  );
  return columnOptions;
  // [TODO] Before publishing: change option inner text (value[0]) to value[1] in order to render the correct names in the dropdown menu;
};

export const updateColumnOptions = (obj, omitKey) => {
  // This helper function clones an object, omitting a specific key.
  const updatedOptions = Object.keys(obj)
    .filter((key) => key !== omitKey)
    .reduce((result, key) => ({ ...result, [key]: obj[key] }), {});
  return updatedOptions;
  // [Ref] As suggested by Wensveen; URL: https://stackoverflow.com/questions/34698905/how-can-i-clone-a-javascript-object-except-for-one-key;
};

export const renderComparisonMenu = () => {
  // [TODO] Before publishing: Translate options to English;
  const options = ['maior que', 'menor que', 'igual a'];
  return (
    <select data-testid="comparison-filter" id="comparison">
      {options.map((option, i) => (
        <option key={ i } value={ option }>{ option }</option>))}
    </select>
  );
};

export const renderButtons = (handleFilterBtn, handleRemoveBtn) => {
  // [TODO] Before publishing: do not show the filter button if all filter options are already in use;
  const select1 = document.getElementById('column');
  const select2 = document.getElementById('comparison');
  const select3 = document.getElementById('number');

  return (
    <span>
      <button
        type="button"
        data-testid="button-filter"
        onClick={ () => handleFilterBtn(select1.value, select2.value, select3.value) }
      >
        Filter
      </button>
      <button
        data-testid="button-remove-filters"
        type="button"
        onClick={ () => handleRemoveBtn('all') }
      >
        Remove All
      </button>
    </span>
  );
};

export const renderFiltersInUse = (selectedOpts, handleRemoveBtn) => {
  // [TODO] Before publishing: do not show options already in use in the dropdown menu;
  const filtersInUse = (
    <div>
      {(selectedOpts.map((option, i) => {
        const { column, comparison, value } = option;
        if (i > 0) {
          return (
            <span key={ i }>
              <p data-testid="filter">
                {`${column} ${comparison} ${value}`}
                <button
                  type="button"
                  onClick={ () => handleRemoveBtn(column) }
                >
                  X
                </button>
              </p>
            </span>
          );
        }
        return null;
      }))}
    </div>);
  return filtersInUse;
};

export const renderTableHeaders = () => (
  <tr>
    { Object.entries(headers).map((header, i) => (<th key={ i }>{ header[1] }</th>))}
  </tr>
);

export const renderPlanetData = (planet, index) => (
  <tr key={ index }>
    {Object.entries(headers).map((header, i) => (
      <td key={ i }>{ planet[header[0]] }</td>
    ))}
  </tr>
);

export const handleFilterByName = (planet, input) => {
  const { name } = planet;
  if (name.toLowerCase().includes(input.toLowerCase())) {
    return planet;
  }
};

export const handleFilterByValues = (planet, input) => {
  const { column, comparison, value } = input[input.length - 1];
  if (!comparison) return planet; // This condition leads to no initial filtering;
  const filterCases = [
    (comparison === 'maior que' && Number(planet[column]) > Number(value)),
    (comparison === 'menor que' && Number(planet[column]) <= Number(value)),
    (comparison === 'igual a' && Number(planet[column]) === Number(value)),
  ];
  if (planet.population !== 'unknown'
  && filterCases.some((condition) => condition)) return planet;
};
