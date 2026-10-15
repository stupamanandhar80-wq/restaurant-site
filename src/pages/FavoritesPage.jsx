import { Link } from "react-router";

import menuItems from "../data/menu.js";
import useFavorites from "../hooks/useFavorites.js";
import DishCard from "../components/DishCard.jsx";

import "./FavoritesPage.css";

function FavoritesPage() {
  const { favoriteIds } = useFavorites();

  const savedDishes = menuItems.filter((item) => favoriteIds.includes(item.id));

  return (
    <section className="favorites-page">
      <div className="favorites-intro">
        <p className="favorites-eyebrow">Your shortlist</p>

        <h1>Saved dishes</h1>

        <p>Keep your favorites together while you plan your visit.</p>

        <p className="favorites-count" role="status">
          {savedDishes.length}{" "}
          {savedDishes.length === 1 ? "dish saved" : "dishes saved"}
        </p>
      </div>

      {savedDishes.length > 0 ? (
        <ul className="favorites-list">
          {savedDishes.map((dish, index) => (
            <li key={dish.id}>
              <DishCard
                dish={dish}
                headingLevel="h2"
                removable
                imageLoading={index < 3 ? "eager" : "lazy"}
              />
            </li>
          ))}
        </ul>
      ) : (
        <div className="favorites-empty">
          <h2>Your next favorite is waiting</h2>

          <p>
            Explore the menu and use the Favorite button to save dishes here.
          </p>

          <Link className="favorites-menu-link" to="/menu">
            Explore the menu
          </Link>
        </div>
      )}
    </section>
  );
}

export default FavoritesPage;
