import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useCardAPI(name = '', page = 1, pageSize = 20) {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  let cancel;

  useEffect(() => {
    setLoading(true);
    axios.get('https://api.elderscrollslegends.io/v1/cards', {
      params: { name, page, pageSize },
      cancelToken: new axios.CancelToken((c) => { cancel = c; }),
    })
      .then((res) => {
        setLoading(false);
        setCards(res.data.cards);
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
    // This is the effect's cleanup function which is using the axios cancelToken
    // to cancel the previous request when a new one is invoked.
    // https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
    return function cleanup() { cancel(); };
  }, [name]);

  return { cards, loading, error };
}
