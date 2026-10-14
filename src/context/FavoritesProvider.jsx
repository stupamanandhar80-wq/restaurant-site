import { useEffect, useState } from "react";
import FavoritesContext from "./FavoritesContext.js";
import menuItems from "../data/menu.js";

const STORAGE_KEY = "saffron-stone-favorites";

function readFavorites() {
  try {
    const savedValue = localStorage.getItem(STORAGE_KEY);

    if (!savedValue) {
      return [];
    }

    const parsedValue = JSON.parse(savedValue);

    if (!Array.isArray(parsedValue)) {
      return [];
    }

    const validIds = parsedValue.filter((id) =>
      menuItems.some((item) => item.id === id),
    );

    return [...new Set(validIds)];
  } catch {
    return [];
  }
}

function FavoritesProvider({ children }) {
  const [favoriteIds, setFavoriteIds] = useState(readFavorites);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favoriteIds));
    } catch {
      console.warn("Saved dishes could not be stored.");
    }
  }, [favoriteIds]);

  function toggleFavorite(id) {
    setFavoriteIds((previousIds) => {
      if (previousIds.includes(id)) {
        return previousIds.filter((savedId) => savedId !== id);
      }

      return [...previousIds, id];
    });
  }

  function removeFavorite(id) {
    setFavoriteIds((previousIds) =>
      previousIds.filter((savedId) => savedId !== id),
    );
  }

  return (
    <FavoritesContext.Provider
      value={{
        favoriteIds,
        toggleFavorite,
        removeFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export default FavoritesProvider;
