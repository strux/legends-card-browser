import React, { useState } from 'react';
import './App.scss';
import useCardAPI from './hooks/useCardAPI';
import Card from './components/card';

function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const { cards } = useCardAPI(query, page);

  const updateQuery = (e) => {
    setQuery(e.target.value);
    setPage(1);
  };

  return (
    <div className="app">
      <header className="header">
        <input type="text" className="search-field" onChange={updateQuery} />
      </header>
      <main className="cards">
        {cards.map((card) => (
          <Card
            name={card.name}
            text={card.text}
            imageUrl={card.imageUrl}
          />
        ))}
      </main>
    </div>
  );
}

export default App;
