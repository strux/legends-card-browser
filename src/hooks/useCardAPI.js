import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useCardAPI(name = '', page = 1, pageSize = 20) {
  const [cards, setCards] = useState([]);
  let cancel;

  useEffect(() => {
    axios.get('https://api.elderscrollslegends.io/v1/cards', {
      params: { name, page, pageSize },
      cancelToken: new axios.CancelToken((c) => { cancel = c; }),
    })
      .then((res) => setCards(res.data.cards))
      .catch((error) => console.log(error));
    // This is the effect cleanup function which is using the axios cancelToken
    // to cancel the previous request when a new one is invoked.
    // https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
    return function cleanup() { cancel(); };
  }, [name]);

  return { cards };
}
