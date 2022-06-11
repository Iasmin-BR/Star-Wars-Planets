import React, { useContext } from 'react';
import Context from '../Context/Context';
import {
  renderColumnOptions, updateColumnOptions, renderComparisonMenu,
} from '../Helpers/Handlers';

function FilterByValues() {
  const { filters, setFilters, setIsLoading } = useContext(Context);
  const { filterOptions } = filters;

  const column = document.getElementById('column');
  const comparison = document.getElementById('comparison');
  const number = document.getElementById('number');

  const handleClick = (columnInput, compInput, numInput) => {
    setIsLoading(true);
    setFilters({
      ...filters,
      filterByValues: [
        {
          column: columnInput,
          comparison: compInput,
          value: numInput,
        },
      ],
      filterOptions: updateColumnOptions(filterOptions, columnInput),
    });
    setIsLoading(false);
  };

  return (
    <div>
      { renderColumnOptions(filterOptions) }
      { renderComparisonMenu() }
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
