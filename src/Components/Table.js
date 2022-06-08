import React, { useContext } from 'react';
import Context from '../Context/Context';
import {
  handleTableHeaders,
  handleObjKeys,
  handleFilterByName,
} from '../Helpers/Handlers';
import Loading from './Loading';

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
          ? (<Loading />)
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
