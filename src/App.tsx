import React from 'react';
import Search from './components/Search';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Giphy Image Search</h1>
        <Search />
      </header>
    </div>
  );
}

export default App;
