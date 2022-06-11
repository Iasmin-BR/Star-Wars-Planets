import React, { useContext } from 'react';
import Context from '../Context/Context';
import Loading from './Loading';
import { renderFiltersInUse } from '../Helpers/Handlers';

function RemoveFilters() {
  const {
    isLoading, filters, handleRemoveButton, handleFilterButton,
  } = useContext(Context);
  const { filterByValues } = filters;

  return (
    <span>
      {(isLoading) ? (<Loading />)
        : (renderFiltersInUse(filterByValues, handleRemoveButton, handleFilterButton))}
    </span>
  );
}

export default RemoveFilters;
