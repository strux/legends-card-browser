import React, { useState, useRef, useCallback } from 'react';
import './App.scss';
import useCardAPI from './hooks/useCardAPI';
import Card from './components/card';

function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const {
    cards, loading, error, hasMoreCards,
  } = useCardAPI(query, page);

  // Let's keep track of this observer across renders with a ref
  const observer = useRef();
  // When a new 'last card' is rendered, we need to setup
  // an IntersectionObserver and tear down the previous one.
  // We'll use the intersection test to fire the next API request.
  const lastCardRef = useCallback((el) => {
    if (loading || error || !el) return;
    if (observer.current) observer.current.disconnect();
    // eslint-disable-next-line no-undef
    observer.current = new IntersectionObserver(([entry]) => {
      if (hasMoreCards && entry.isIntersecting) setPage(page + 1);
    }, { rootMargin: '0px 0px 10%' }); // Bottom margin buffer to load next page sooner
    observer.current.observe(el);
  }, [loading]);

  const updateQuery = (e) => {
    setQuery(e.target.value);
    // We need to reset paging if the query changes
    setPage(1);
  };

  return (
    <div className="app">
      <header className="header">
        <input type="text" className="search-field" onChange={updateQuery} placeholder="Type name to search" />
      </header>
      <main className="cards">
        {cards.map((card, i) => (
          <Card
            key={card.id}
            name={card.name}
            text={card.text}
            setName={card.set.name}
            type={card.type}
            imageUrl={card.imageUrl}
            ref={(i === cards.length - 1) ? lastCardRef : null}
          />
        ))}
        { loading && (
          <Card
            key="loading"
            name="Loading"
            text="Loading some new cards for you now.  Please hold."
            setName="Loading"
            type="Loading"
            imageUrl="https://images.elderscrollslegends.io/cs/reachman_shaman.png"
          />
        )}
      </main>
      { error && (
        <figure className="error">
          <figcaption>{error}</figcaption>
        </figure>
      )}
    </div>
  );
}

export default App;
