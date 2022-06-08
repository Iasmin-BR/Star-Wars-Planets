import React, { useContext } from 'react';
import Context from '../Context/Context';

function FilterByName() {
  const { filters, setFilters } = useContext(Context);

  const handleOnChange = (event) => {
    setFilters({
      ...filters,
      filterByName: event.target.value,
    });
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
