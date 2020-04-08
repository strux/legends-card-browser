import React, { useState } from 'react';
import './App.css';
import useCardAPI from './hooks/useCardAPI';

function App() {
  const [query, setQuery] = useState('');
  const { cards } = useCardAPI(query);

  const updateQuery = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="app">
      <header className="header">
        <input type="text" className="search-field" onChange={updateQuery} />
      </header>
      <main>
        {cards.map((card) => <h1>{card.name}</h1>)}
      </main>
    </div>
  );
}

export default App;
