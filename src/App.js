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
      <div id="stars" />
      <div id="stars2" />
      <div id="stars3" />
      <FilterBar />
      <Table />
    </Provider>
  );
}

export default App;
