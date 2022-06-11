import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import {
  fetchAPI, initalFilters, numericFilters, updateColumnOptions,
} from '../Helpers/Handlers';

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    filterByName: '', filterByValues: initalFilters, filterOptions: numericFilters,
  });
  const { filterByValues, filterOptions } = filters;

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

  const handleFilterButton = (select1, select2, select3) => {
    setIsLoading(true);
    setFilters({
      ...filters,
      filterByValues: [...filterByValues,
        { column: select1, comparison: select2, value: select3 }],
      filterOptions: updateColumnOptions(filterOptions, select1),
    });
    setIsLoading(false);
  };

  const handleRemoveButton = (option) => {
    setIsLoading(true);
    if (option === 'all') {
      setFilters({
        ...filters, filterByValues: initalFilters, filterOptions: numericFilters,
      });
    } else {
      setFilters({
        ...filters,
        filterByValues: filterByValues.filter((filter) => (filter.column !== option)),
      });
    }
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
    handleFilterButton,
    handleRemoveButton,
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
