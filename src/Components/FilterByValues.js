import React, { useContext } from 'react';
import Context from '../Context/Context';

function FilterByValues() {
  const { filters, setFilters, setIsLoading } = useContext(Context);

  const column = document.getElementById('column');
  const comparison = document.getElementById('comparison');
  const number = document.getElementById('number');

  const handleClick = (value1, value2, value3) => {
    setIsLoading(true);
    setFilters({
      ...filters,
      filterByValues: [
        {
          column: value1,
          comparison: value2,
          value: value3,
        },
      ],
    });
    setIsLoading(false);
  };

  return (
    <div>
      <select data-testid="column-filter" id="column">
        <option value="population" id="population">population</option>
        <option value="orbital_period" id="orbital_period">orbital_period</option>
        <option value="diameter" id="diameter">diameter</option>
        <option value="rotation_period" id="rotation_period">rotation_period</option>
        <option value="surface_water" id="surface_water">surface_water</option>
      </select>
      <select data-testid="comparison-filter" id="comparison">
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        id="number"
        data-testid="value-filter"
        type="number"
        placeholder="Enter a value"
        defaultValue="0"
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ () => handleClick(column.value, comparison.value, number.value) }
      >
        Filter
      </button>
    </div>
  );
}

export default FilterByValues;
