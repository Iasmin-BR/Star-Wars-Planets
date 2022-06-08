import React from 'react';
import './App.css';
import FilterBar from './Components/FilterBar';
import Table from './Components/Table';
import Provider from './Context/Provider';

function App() {
  return (
    <Provider>
      <h1>=== HEADER ===</h1>
      <FilterBar />
      <Table />
    </Provider>
  );
}

export default App;
