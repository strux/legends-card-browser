import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useCardAPI(name = '', pageSize = 20, page = 1) {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    axios.get('https://api.elderscrollslegends.io/v1/cards', {
      params: {
        page,
        pageSize,
        name,
      },
    })
      .then((res) => setCards(res.data.cards))
      .catch((error) => console.log(error));
  }, [name]);

  return { cards };
}
