import React, { useContext } from 'react';
import Context from '../Context/Context';
import { renderColumnOptions, renderComparisonMenu } from '../Helpers/Handlers';

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
      { renderColumnOptions() }
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
