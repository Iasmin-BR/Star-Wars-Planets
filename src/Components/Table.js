import React, { useContext } from 'react';
import Context from '../Context/Context';
import {
  renderTableHeaders, renderPlanetData, handleFilterByName, handleFilterByValues,
} from '../Helpers/Handlers';

function Table() {
  const { planets, isLoading, filters } = useContext(Context);
  const { filterByName, selectedFilters } = filters;

  return (
    <div>
      {(isLoading) ? (<h2>Loading...</h2>) : (
        <table>
          <tbody>
            { renderTableHeaders() }
            {
              planets
                .filter((planet) => handleFilterByName(planet, filterByName))
                .filter((planet) => handleFilterByValues(planet, selectedFilters))
                .map((planet, index) => (renderPlanetData(planet, index)))
            }
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Table;
