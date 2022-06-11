import React, { useContext } from 'react';
import Context from '../Context/Context';
import {
  renderColumnOptions, renderComparisonMenu,
} from '../Helpers/Handlers';
import RemoveFilters from './RemoveFilters';

function FilterBar() {
  const { filters, handleOnChange } = useContext(Context);
  return (
    <div>
      <hr />
      <input
        data-testid="name-filter"
        type="text"
        id="name-filter"
        name="nameFilter"
        placeholder="Filter by name"
        value={ filters.filterByName }
        onChange={ (event) => handleOnChange(event) }
      />
      { renderColumnOptions(filters.filterOptions) }
      { renderComparisonMenu() }
      <input
        id="number"
        data-testid="value-filter"
        type="number"
        placeholder="Enter a value"
        defaultValue="0"
      />
      <RemoveFilters />
      <hr />
    </div>
  );
}

export default FilterBar;
