import React from 'react';
import planetsImages from './planetsImages';

const headers = {
  image: '',
  name: '',
  terrain: '',
  rotation_period: 'Rotation',
  orbital_period: 'Orbital',
  diameter: 'Diameter',
  population: 'Population',
  // films: 'Films',
};

export const numericFilters = {
  population: 'Population',
  rotation_period: 'Rotation Period',
  orbital_period: 'Orbital Period',
  diameter: 'Diameter',
  // surface_water: 'Surface Water',
};

export const fetchAPI = async () => {
  const url = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const response = await fetch(url);
  const data = await response.json();
  const planetsInfo = data.results;
  const result = planetsInfo.map((planet) => {
    const findImg = planetsImages.find((photo) => (
      planet.name === photo.planet));
    return { ...planet, image: findImg.image };
  });
  return result;
};

export const renderColumnOptions = (filterOptions) => {
  const columnOptions = (Object.entries(filterOptions).map((value, index) => (
    <option key={ index } value={ value[0] } id={ value[0] }>
      { value[1] }
    </option>)));
  return columnOptions;
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
  const options = ['greater than', 'less than', 'equal to'];
  return (
    <select data-testid="comparison-filter" id="comparison">
      {options.map((option, i) => (
        <option key={ i } value={ option }>{ option }</option>))}
    </select>
  );
};

export const renderButtons = (handleFilterBtn, handleRemoveBtn) => {
  // [TODO] BP: do not show the filter button if all filter options are already in use;
  const select1 = document.getElementById('column-filter');
  const select2 = document.getElementById('comparison');
  const select3 = document.getElementById('number');
  // [TODO] BP: Add Number() method to select3.value and remove it from the comparison function;
  return (
    <>
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
    </>
  );
};

export const renderFiltersInUse = (selectedOpts, handleRemoveBtn) => {
  // [TODO] BP: do not show options already in use in the dropdown menu;
  const filtersInUse = (
    <div>
      {(selectedOpts.map((option, i) => {
        const { column, comparison, value } = option;
        if (i > 0) {
          return (
            <div className="filter-in-use" key={ i }>
              <p data-testid="filter">
                {`${column.replace('_', ' ')} ${comparison} ${value}`}
                <button
                  type="button"
                  onClick={ () => handleRemoveBtn(column) }
                >
                  X
                </button>
              </p>
            </div>
          );
        }
        return null;
      }))}
    </div>);
  return filtersInUse;
};

// [TODO] BP: Remove unnecessary ifs here:
export const renderPlanetData = (planet, index) => (
  <tr key={ index }>
    {
      Object.entries(headers).map((header, i) => {
        if (header[0] === 'image') {
          return (
            <td key={ i }>
              <img
                className="planet-img"
                src={ planet.image }
                alt={ `${planet.name} ilustration` }
              />
            </td>
          );
        }
        if (header[0] === 'name') {
          return (
            <td key={ i }>
              <h2 className="planet-name">{ planet.name.toUpperCase() }</h2>
              <p className="planet-desc">{ planet.terrain }</p>
            </td>
          );
        }
        if (header[0] === 'terrain') {
          return;
        }
        return (
          <td key={ i }>
            <h4 className="header-num">{ header[1] }</h4>
            <hr />
            <p className="row-num">{ Number(planet[header[0]]) || 'unkown' }</p>
          </td>);
      })
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
  const { column, comparison, value } = input[input.length - 1];
  if (!comparison) return planet; // This condition leads to no initial filtering;
  const filterCases = [
    (comparison === 'greater than' && planet[column] > Number(value)),
    (comparison === 'less than' && planet[column] <= Number(value)),
    (comparison === 'equal to' && planet[column] === value),
  ];
  if (planet.population !== 'unknown'
  && filterCases.some((condition) => condition)) return planet;
};

export const renderSortOptions = (handleSortBtn) => {
  const column = document.getElementById('column-sort');
  let selectedOrder;

  return (
    <>
      <label htmlFor="sort-order-asc">
        ▲
        <input
          data-testid="column-sort-input-asc"
          type="radio"
          id="sort-order-asc"
          name="sort-order"
          value="ASC"
          onChange={ (event) => { selectedOrder = event.target.value; } }
          checked={ selectedOrder && selectedOrder === 'ASC' }
        />
      </label>
      <label htmlFor="sort-order-desc">
        ▼
        <input
          data-testid="column-sort-input-desc"
          type="radio"
          id="sort-order-desc"
          name="sort-order"
          value="DESC"
          onChange={ (event) => { selectedOrder = event.target.value; } }
          checked={ selectedOrder && selectedOrder === 'DESC' }
        />
      </label>
      <button
        data-testid="column-sort-button"
        type="button"
        onClick={ () => handleSortBtn(column.value, selectedOrder) }
      >
        Sort
      </button>
    </>
  );
};
