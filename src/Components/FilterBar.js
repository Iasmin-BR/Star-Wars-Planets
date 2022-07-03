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

  const filterBar = (
    <section className="filter-bar">
      <div>
        <input
          data-testid="name-filter"
          className="search-name"
          type="text"
          id="name-filter"
          name="nameFilter"
          placeholder="Search by planet name"
          value={ filters.filterByName }
          onChange={ (event) => handleOnChange(event) }
        />
      </div>
      <div className="filters-row">
        <div className="select-filter">
          <h4>Filter options</h4>
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
        </div>
        {(!isLoading) && (
          <div className="filter-btns">
            <span>{renderButtons(handleFilterBtn, handleRemoveBtn)}</span>
          </div>)}
        <div>
          <div className="sort-filters">
            <h4>Sort options</h4>
            <select data-testid="column-sort" id="column-sort">
              { renderColumnOptions(numericFilters) }
            </select>
            <span>{renderSortOptions(handleSortBtn)}</span>
            <div>{renderFiltersInUse(selectedFilters, handleRemoveBtn)}</div>
          </div>
        </div>
      </div>

    </section>
  );

  return (
    isLoading
      ? (<div className="loading-bar"><Demo /></div>)
      : (filterBar)
  );
}

export default FilterBar;
