import React, { useContext } from 'react';
import Context from '../Context/Context';
import { handleColumnOptions } from '../Helpers/Handlers';

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
        { handleColumnOptions() }
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
