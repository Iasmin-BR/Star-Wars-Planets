import React, { useContext } from 'react';
import Context from '../Context/Context';
import { headers, objectKeys } from '../Helpers/DataAPI';

function Table() {
  const { planets, isLoading } = useContext(Context);

  return (
    <div>
      {
        (isLoading)
          ? ('Loading...')
          : (
            <table>
              <tbody>
                <tr>
                  {
                    headers.map((header, index) => <th key={ index }>{ header }</th>)
                  }
                </tr>

                {
                  planets.map((planet, index) => (
                    <tr key={ index }>
                      {
                        objectKeys.map((header, i) => (
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
