import React, { useContext } from 'react';
import Context from '../Context/Context';
import Loading from './Loading';
// import {
//   renderColumnOptions, updateColumnOptions, renderComparisonMenu,
// } from '../Helpers/Handlers';

function RemoveFilters() {
  const { isLoading, setIsLoading, filters, setFilters } = useContext(Context);
  const { filterByValues } = filters;

  const handleRemoveButton = (option) => {
    setIsLoading(true);
    if (option === 'all') {
      setFilters({
        ...filters,
        filterByValues: [
          {
            column: '',
            comparison: '',
            value: 0,
          },
        ],
        filterOptions: {
          population: 'Population',
          rotation_period: 'Rotation Period',
          orbital_period: 'Orbital Period',
          diameter: 'Diameter',
          surface_water: 'Surface Water',
        },
      });
    } else {
      setFilters({
        ...filters,
        filterByValues: filterByValues.filter((filter) => (filter.column !== option)),
      });
    }
    setIsLoading(false);
  };

  return (
    <div>
      {
        (isLoading)
          ? (<Loading />)
          : (
            <span>
              <h3>=== Remove Filters ===</h3>
              {
                (filterByValues.length)
              && (
                filterByValues.map((filter, i) => {
                  const { column, comparison, value } = filter;
                  if (i > 0) {
                    return (
                      <span key={ i }>
                        <p data-testid="filter">
                          {`${column} ${comparison} ${value}`}
                          <button
                            type="button"
                            onClick={ () => handleRemoveButton(column) }
                          >
                            X
                          </button>
                        </p>
                      </span>
                    );
                  }
                  return null;
                })
              )
              }
              <button
                data-testid="button-remove-filters"
                type="button"
                onClick={ () => handleRemoveButton('all') }
              >
                Remove All
              </button>
            </span>
          )
      }

    </div>
  );
}

export default RemoveFilters;
