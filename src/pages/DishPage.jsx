import { Link, useLocation, useParams } from "react-router";
import menuItems from "../data/menu";
import "./DishPage.css"

function DishPage () {
    const { dishId } = useParams();
    const { search } = useLocation();

    const dish = menuItems.find((item) => String(item.id) === dishId);

    if (!dish) {
        return (
            <section className="dish-page">
                <h1>Dish not found</h1>
                <p>We could not find the dish on our menu.</p>
                <Link to={`/menu${search}`}> Return to menu</Link>
            </section>
        );
    }

    const ingredients = dish.ingredients ?? [];

    const relatedDishes = menuItems
        .filter(
            (item) => 
                item.category === dish.category && 
                item.id !== dish.id
        )
        .slice(0,3);

        return(
            <div className="dish-page">
                <Link className="dish-back" to={`/menu${search}`}>
                     ← Back to menu
                </Link>

                <article className="dish-detail">
                    <div>
                        <p className="dish-category">{dish.category}</p>
                        <h1>{dish.name}</h1>

                        <span
                            className={`dish-badge ${
                                dish.vegetarian ? 'dish-badge-veg' : 'dish-badge-nonveg'
                            }`}
                        >
                            {dish.vegetarian ? 'Vegetarian' : 'Non-Vegetarian'}
                        </span>

                        <p className="dish-description">{dish.description}</p>
                        <p className="dish-price">NPR {dish.price}</p>

                        <Link className="dish-reserve" to="/reservations">Reserve a table</Link>
                    </div>

                    <div className="dish-ingredients">
                        <h2>Ingredients</h2>
                        {ingredients.length > 0 ? (
                            <ul>
                                {ingredients.map((ingredient) => (
                                    <li key={ingredient}> {ingredient}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>Ingredient details are coming soon.</p>
                        )}
                    </div>
                </article>

                {relatedDishes.length > 0 && (
                    <section className="dish-related">
                        <h2>You might also enjoy</h2>

                        <ul className="dish-related-list">
                            {relatedDishes.map((relatedDish) => (
                                <li key={relatedDish.id}>
                                    <Link to={`/menu/${relatedDish.id}${search}`}>
                                        {relatedDish.name}
                                    </Link>

                                    <p>NPR {relatedDish.price}</p>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}
            </div>
        );
}

export default DishPage;