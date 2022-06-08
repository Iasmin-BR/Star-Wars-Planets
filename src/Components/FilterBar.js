import React, { useContext, useEffect } from 'react';
import Context from '../Context/Context';
import { fetchAPI } from '../Helpers/Handlers';
import FilterByName from './FilterByName';
import FilterByValues from './FilterByValues';

function FilterBar() {
  const { setPlanets, setIsLoading } = useContext(Context);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await fetchAPI();
      setPlanets(data);
      setIsLoading(false);
    };
    fetchData();
  }, [setPlanets, setIsLoading]);

  return (
    <div>
      <hr />
      <h2>=== FILTER BAR ===</h2>
      <form>
        <FilterByName />
        <hr />
        <FilterByValues />
      </form>
      <hr />
    </div>
  );
}

export default FilterBar;
