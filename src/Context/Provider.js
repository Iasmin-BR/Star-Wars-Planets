import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    filterByName: '',
    filterByValues: [
      {
        column: 'population',
        comparison: '',
        value: 0,
      },
    ],
  });

  const context = {
    planets,
    setPlanets,
    isLoading,
    setIsLoading,
    filters,
    setFilters,
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
