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
        column: '',
        comparison: '',
        value: 0,
      },
    ],
    filterOptions: {
      population: 'Population',
      rotation_period: 'Rotation Period',
      orbital_period: 'Orbital Period',
      diameter: 'Diameter',
      surface_water: 'Surface Water',
    },
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
