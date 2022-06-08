import React, { useContext } from 'react';
import Context from '../Context/Context';
import { headersAPI, objKeysAPI } from '../Helpers/DataAPI';

function Table() {
  const { planets, isLoading } = useContext(Context);

  return (
    <div>
      {
        (isLoading)
          ? ('Loading...') // [TODO] Fazer componente Loading;
          : (
            <table>
              <tbody>
                <tr>
                  {
                    headersAPI.map((header, index) => <th key={ index }>{ header }</th>)
                  }
                </tr>

                {
                  planets.map((planet, index) => (
                    <tr key={ index }>
                      {
                        objKeysAPI.map((header, i) => (
                          <td key={ i }>
                            { planet[header] }
                          </td>
                        ))
                      }
                    </tr>
                  ))
                }
              </tbody>
            </table>
          )
      }

    </div>
  );
}

export default Table;
