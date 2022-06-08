import React, { useContext } from 'react';
import Context from '../Context/Context';

function FilterByName() {
  const { filters, setFilters, setIsLoading } = useContext(Context);

  // [TODO]: Refatorar handleOnChange para um hook customizável;
  const handleOnChange = (event) => {
    setIsLoading(true);
    setFilters({
      ...filters,
      filterByName: event.target.value,
    });
    setIsLoading(false);
  };

  return (
    <div>
      <section>
        <input
          data-testid="name-filter"
          type="text"
          id="name-filter"
          name="nameFilter"
          placeholder="Filter by name"
          value={ filters.filterByName }
          onChange={ (event) => handleOnChange(event) }
        />
      </section>
    </div>
  );
}

export default FilterByName;
