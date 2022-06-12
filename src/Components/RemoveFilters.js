import React, { useContext } from 'react';
import Context from '../Context/Context';
import Loading from './Loading';
import { renderButtons, renderFiltersInUse } from '../Helpers/Handlers';

function RemoveFilters() {
  const {
    isLoading, filters, handleFilterBtn, handleRemoveBtn,
  } = useContext(Context);
  const { selectedFilters } = filters;

  return (
    <span>
      {(isLoading) ? (<Loading />)
        : (
          <span>
            <span>{renderButtons(handleFilterBtn, handleRemoveBtn)}</span>
            <div>{renderFiltersInUse(selectedFilters, handleRemoveBtn)}</div>
          </span>
        )}
    </span>
  );
}

export default RemoveFilters;
