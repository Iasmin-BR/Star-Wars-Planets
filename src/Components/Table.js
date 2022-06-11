import React, { useContext } from 'react';
import Context from '../Context/Context';
import {
  renderTableHeaders,
  renderPlanetData,
  handleFilterByName,
  handleFilterByValues,
} from '../Helpers/Handlers';
import Loading from './Loading';

function Table() {
  const { planets, isLoading, filters } = useContext(Context);
  const { filterByName, filterByValues } = filters;

  return (
    <div>
      {
        (isLoading)
          ? (<Loading />)
          : (
            <table>
              <tbody>
                { renderTableHeaders() }
                {
                  planets
                    .filter((planet) => handleFilterByName(planet, filterByName))
                    .filter((planet) => handleFilterByValues(planet, filterByValues))
                    .map((planet, index) => (renderPlanetData(planet, index)))
                }
              </tbody>
            </table>
          )
      }

    </div>
  );
}

export default Table;
