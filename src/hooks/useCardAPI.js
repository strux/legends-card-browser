import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useCardAPI(name = '', page = 1, pageSize = 20) {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [hasMoreCards, setHasMoreCards] = useState(true);
  let cancel;

  // If the card name changes, we need to clear the card set.
  // Hence, this effect only depends on name.
  useEffect(() => {
    setCards([]);
  }, [name]);

  useEffect(() => {
    setLoading(true);
    axios.get('https://api.elderscrollslegends.io/v1/cards', {
      params: { name, page, pageSize },
      cancelToken: new axios.CancelToken((c) => { cancel = c; }),
    })
      .then((res) => {
        setLoading(false);
        // Merge new cards into current set
        setCards((currCards) => [...currCards, ...res.data.cards]);
        // eslint-disable-next-line no-underscore-dangle
        setHasMoreCards(res.data._totalCount > pageSize * page);
      })
      .catch((err) => {
        // No need to report our own cancellations
        if (axios.isCancel(err)) return;
        setLoading(false);
        setError(err.message);
      });
    // This is the effect's cleanup function which is using the axios cancelToken
    // to cancel the previous request when a new one is invoked.
    // https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
    return function cleanup() { cancel(); };
  }, [name, page]);

  return {
    cards, hasMoreCards, loading, error,
  };
}
