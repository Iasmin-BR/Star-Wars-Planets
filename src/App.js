import React from 'react';
import './Style/App.css';
import FilterBar from './Components/FilterBar';
import Header from './Components/Header';
import Table from './Components/Table';
import Provider from './Context/Provider';

function App() {
  return (
    <Provider>
      <Header />
      <FilterBar />
      <Table />
    </Provider>
  );
}

export default App;
