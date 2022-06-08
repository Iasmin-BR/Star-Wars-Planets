import React, { useContext } from 'react';
import Context from '../Context/Context';
import {
  handleTableHeaders,
  handleObjKeys,
  handleFilterByName,
} from '../Helpers/Handlers';

function Table() {
  const { planets, isLoading, filters: {
    filterByName,
    // filterByValues,
  },
  } = useContext(Context);

  return (
    <div>
      {
        (isLoading)
          ? ('Loading...') // [TODO] Fazer componente Loading;
          : (
            <table>
              <tbody>
                <tr>
                  { handleTableHeaders() }
                </tr>
                {
                  planets
                    .filter((planet) => handleFilterByName(planet, filterByName))
                    .map((planet, index) => (handleObjKeys(planet, index)))
                }
              </tbody>
            </table>
          )
      }

    </div>
  );
}

export default Table;
