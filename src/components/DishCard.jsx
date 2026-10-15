import { Link } from "react-router";
import useFavorites from "../hooks/useFavorites.js";

import "./DishCard.css";

function DishCard({
  dish,
  querySuffix = "",
  headingLevel = "h3",
  removable = false,
  imageLoading = "lazy",
}) {
  const { favoriteIds, toggleFavorite, removeFavorite } = useFavorites();

  const isFavorite = favoriteIds.includes(dish.id);

  const Heading = headingLevel;
  const dishUrl = `/menu/${dish.id}${querySuffix}`;

  return (
    <article className="dish-card">
      <div className="dish-card-image-frame">
        <img
          className="dish-card-image"
          src={dish.image}
          alt={dish.imageAlt}
          width="1200"
          height="900"
          loading={imageLoading}
          decoding="async"
        />
      </div>

      <div className="dish-card-body">
        <p className="dish-card-category">{dish.category}</p>

        <Heading className="dish-card-title">
          <Link to={dishUrl}>{dish.name}</Link>
        </Heading>

        <span
          className={`dish-card-badge ${
            dish.vegetarian ? "dish-card-badge-veg" : "dish-card-badge-nonveg"
          }`}
        >
          {dish.vegetarian ? "Vegetarian" : "Non-vegetarian"}
        </span>

        <p className="dish-card-description">{dish.description}</p>

        <div className="dish-card-bottom">
          <p className="dish-card-price">NPR {dish.price}</p>

          {removable ? (
            <button
              className="dish-card-button"
              type="button"
              onClick={() => removeFavorite(dish.id)}
              aria-label={`Remove ${dish.name} from saved dishes`}
            >
              Remove
            </button>
          ) : (
            <button
              className="dish-card-button"
              type="button"
              aria-pressed={isFavorite}
              aria-label={`Favorite: ${dish.name}`}
              onClick={() => toggleFavorite(dish.id)}
            >
              <span aria-hidden="true">{isFavorite ? "★" : "☆"}</span>
              Favorite
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

export default DishCard;
