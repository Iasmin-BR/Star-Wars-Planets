import React, { useContext } from 'react';
import { Context } from '../Context/Provider';
import {
  numericFilters, renderColumnOptions, renderComparisonMenu,
  renderButtons, renderFiltersInUse, renderSortOptions,
} from '../Helpers/Handlers';
import Demo from './Demo';
import '../Style/FilterBar.css';

function FilterBar() {
  const {
    isLoading, filters, handleOnChange,
    handleFilterBtn, handleRemoveBtn, handleSortBtn,
  } = useContext(Context);

  const { selectedFilters } = filters;

  const FIVE_SECS = 5000;
  const filterBar = (
    <div className="filter-bar">
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
      <select data-testid="column-filter" id="column-filter">
        { renderColumnOptions(filters.filterOptions) }
      </select>
      { renderComparisonMenu() }
      <input
        id="number"
        data-testid="value-filter"
        type="number"
        placeholder="Enter a value"
        defaultValue="0"
      />
      {(!isLoading) && (
        <span>
          <span>{renderButtons(handleFilterBtn, handleRemoveBtn)}</span>
        </span>)}
      <div>
        <hr />
        <select data-testid="column-sort" id="column-sort">
          { renderColumnOptions(numericFilters) }
        </select>
        <span>{renderSortOptions(handleSortBtn)}</span>
        <hr />
        <div>{renderFiltersInUse(selectedFilters, handleRemoveBtn)}</div>
        <hr />
      </div>
    </div>
  );

  return (
    isLoading
      ? (<div className="loading-bar"><Demo /></div>)
      : (filterBar)
  );
}

export default FilterBar;
