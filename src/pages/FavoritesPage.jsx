import { Link } from "react-router";

import menuItems from "../data/menu.js";
import useFavorites from "../hooks/useFavorites.js";

import "./FavoritesPage.css";

function FavoritesPage() {
  const { favoriteIds, removeFavorite } = useFavorites();

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
          {savedDishes.map((dish) => (
            <li className="saved-dish" key={dish.id}>
              <div className="saved-dish-content">
                <p className="saved-dish-category">{dish.category}</p>

                <h2>
                  <Link to={`/menu/${dish.id}`}>{dish.name}</Link>
                </h2>

                <p>{dish.description}</p>

                <span
                  className={`saved-dish-badge ${
                    dish.vegetarian
                      ? "saved-dish-badge-veg"
                      : "saved-dish-badge-nonveg"
                  }`}
                >
                  {dish.vegetarian ? "Vegetarian" : "Non-vegetarian"}
                </span>
              </div>

              <div className="saved-dish-actions">
                <p className="saved-dish-price">NPR {dish.price}</p>

                <button
                  type="button"
                  onClick={() => removeFavorite(dish.id)}
                  aria-label={`Remove ${dish.name} from saved dishes`}
                >
                  Remove
                </button>
              </div>
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
