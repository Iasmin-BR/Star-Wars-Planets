import React, { useContext, useEffect } from 'react';
import Context from '../Context/Context';
import { fetchAPI } from '../Helpers/DataAPI';

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
      <h2>=== FILTER BAR ===</h2>
    </div>
  );
}

export default FilterBar;