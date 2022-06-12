import React, { useContext } from 'react';
import Context from '../Context/Context';
import {
  renderColumnOptions, renderComparisonMenu, renderButtons, renderFiltersInUse,
} from '../Helpers/Handlers';

function FilterBar() {
  const {
    isLoading, filters, handleOnChange, handleFilterBtn, handleRemoveBtn,
  } = useContext(Context);
  const { selectedFilters } = filters;

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
      <span>
        {(isLoading) ? (<h3>Loading...</h3>)
          : (
            <span>
              <span>{renderButtons(handleFilterBtn, handleRemoveBtn)}</span>
              <div>{renderFiltersInUse(selectedFilters, handleRemoveBtn)}</div>
            </span>
          )}
      </span>
      <hr />
    </div>
  );
}

export default FilterBar;
