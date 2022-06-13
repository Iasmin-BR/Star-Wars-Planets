import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchAPI, numericFilters, updateColumnOptions } from '../Helpers/Handlers';

export const Context = createContext();

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    filterByName: '', selectedFilters: [{}], filterOptions: numericFilters, sortOpts: {},
  });
  const { selectedFilters, filterOptions } = filters;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await fetchAPI();
      setPlanets(data);
      setIsLoading(false);
    };
    fetchData();
  }, [setPlanets, setIsLoading]);

  const handleOnChange = (event) => {
    setIsLoading(true);
    setFilters({
      ...filters,
      filterByName: event.target.value,
    });
    setIsLoading(false);
  };

  const handleFilterBtn = (select1, select2, select3) => {
    setIsLoading(true);
    setFilters({
      ...filters,
      selectedFilters: [...selectedFilters,
        { column: select1, comparison: select2, value: select3 }],
      filterOptions: updateColumnOptions(filterOptions, select1),
    });
    setIsLoading(false);
  };

  const handleRemoveBtn = (option) => {
    setIsLoading(true);
    if (option === 'all') {
      setFilters({
        ...filters, selectedFilters: [{}], filterOptions: numericFilters,
      });
    } else {
      setFilters({
        ...filters,
        selectedFilters: selectedFilters.filter((filter) => (filter.column !== option)),
      });
    }
    setIsLoading(false);
  };

  const handleSortBtn = (column, order) => {
    setIsLoading(true);
    setFilters({
      ...filters, sortOpts: { column, order },
    });
    setIsLoading(false);
  };

  const context = {
    planets,
    setPlanets,
    isLoading,
    setIsLoading,
    filters,
    setFilters,
    handleOnChange,
    handleFilterBtn,
    handleRemoveBtn,
    handleSortBtn,
  };

  return (
    <Context.Provider value={ context }>
      { children }
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
