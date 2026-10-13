import { useEffect, useState } from 'react';

const STORAGE_KEY = 'saffron-stone-favorites';

function readFavorites() {
  try {
    const storedValue = localStorage.getItem(STORAGE_KEY);
    const parsedValue = storedValue ? JSON.parse(storedValue) : [];

    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return [
      ...new Set(
        parsedValue.filter((id) => Number.isInteger(id) && id > 0)
      ),
    ];
  } catch {
    return [];
  }
}

function useFavorites() {
  const [favoriteIds, setFavoriteIds] = useState(readFavorites);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favoriteIds));
    } catch {
      console.warn('Favorites could not be saved in this browser.');
    }
  }, [favoriteIds]);

  function toggleFavorite(id) {
    setFavoriteIds((previousIds) =>
      previousIds.includes(id)
        ? previousIds.filter((savedId) => savedId !== id)
        : [...previousIds, id]
    );
  }

  return { favoriteIds, toggleFavorite };
}

export default useFavorites;