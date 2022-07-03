import React, { useContext } from 'react';
import { Context } from '../Context/Provider';
import {
  renderPlanetData, handleFilterByName, handleFilterByValues,
} from '../Helpers/Handlers';
import '../Style/Table.css';

function Table() {
  const { planets, isLoading, filters } = useContext(Context);
  const { filterByName, selectedFilters, sortOpts } = filters;
  const { column, order } = sortOpts;

  return (
    <div className="table-section">
      {(isLoading) ? (<h2>Loading...</h2>) : (
        <table>
          <tbody>
            { // [TODO] Next: add method Number() to table numeric values;
              planets
                .sort((a, b) => {
                  if (!column) return a.name.localeCompare(b.name);
                  if (b[column] === 'unknown') {
                    return a[column].localeCompare(b[column]);
                  }
                  if (column && order === 'ASC') {
                    return a[column] - b[column];
                  }
                  if (column && order === 'DESC') {
                    return b[column] - a[column];
                  }
                  return null;
                })
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
