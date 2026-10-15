import { useSearchParams } from "react-router";
import menuItems from "../data/menu.js";
import "./Menu.css";
import DishCard from "./DishCard.jsx";

const categories = ["All", "Starters", "Mains", "Desserts"];
const sortOptions = ["recommended", "price-low", "price-high"];

function Menu() {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchTerm = searchParams.get("q") ?? "";

  const categoryParam = searchParams.get("category");
  const selectedCategory = categories.includes(categoryParam)
    ? categoryParam
    : "All";

  const vegetarianOnly = searchParams.get("veg") === "1";

  const sortParam = searchParams.get("sort");
  const sortOrder = sortOptions.includes(sortParam) ? sortParam : "recommended";

  const queryString = searchParams.toString();
  const querySuffix = queryString ? `?${queryString}` : "";

  function updateFilters(changes) {
    setSearchParams(
      (previousParams) => {
        const nextParams = new URLSearchParams(previousParams);

        Object.entries(changes).forEach(([key, value]) => {
          if (value === "") {
            nextParams.delete(key);
          } else {
            nextParams.set(key, value);
          }
        });

        return nextParams;
      },
      { replace: true },
    );
  }

  function clearFilters() {
    updateFilters({
      q: "",
      category: "",
      veg: "",
      sort: "",
    });
  }

  const normalizedSearch = searchTerm.trim().toLowerCase();

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;

    const searchableText = `${item.name} ${item.description}`.toLowerCase();

    const matchesSearch = searchableText.includes(normalizedSearch);
    const matchesDiet = !vegetarianOnly || item.vegetarian === true;

    return matchesCategory && matchesSearch && matchesDiet;
  });

  const visibleItems = [...filteredItems];

  if (sortOrder === "price-low") {
    visibleItems.sort((first, second) => first.price - second.price);
  } else if (sortOrder === "price-high") {
    visibleItems.sort((first, second) => second.price - first.price);
  }

  return (
    <section id="menu" className="restaurant-menu">
      <h2>Our Menu</h2>
      <p>Made for sharing, savoring, and coming back for.</p>
      <p className="menu-note">Prices in NPR</p>

      <div className="menu-controls">
        <div className="menu-control">
          <label htmlFor="menu-search">Search dishes</label>
          <input
            id="menu-search"
            type="search"
            placeholder="Try hummus, rice, or lemon"
            value={searchTerm}
            onChange={(event) => updateFilters({ q: event.target.value })}
          />
        </div>

        <div className="menu-control">
          <label htmlFor="menu-sort">Sort dishes</label>
          <select
            id="menu-sort"
            value={sortOrder}
            onChange={(event) =>
              updateFilters({
                sort:
                  event.target.value === "recommended"
                    ? ""
                    : event.target.value,
              })
            }
          >
            <option value="recommended">Menu order</option>
            <option value="price-low">Price: low to high</option>
            <option value="price-high">Price: high to low</option>
          </select>
        </div>

        <label className="menu-diet" htmlFor="vegetarian-only">
          <input
            id="vegetarian-only"
            type="checkbox"
            checked={vegetarianOnly}
            onChange={(event) =>
              updateFilters({ veg: event.target.checked ? "1" : "" })
            }
          />
          Vegetarian only
        </label>
      </div>

      <div className="menu-filters" role="group" aria-label="Filter menu">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className="menu-filter"
            aria-pressed={selectedCategory === category}
            onClick={() =>
              updateFilters({
                category: category === "All" ? "" : category,
              })
            }
          >
            {category}
          </button>
        ))}
      </div>

      <div className="menu-results-bar">
        <p className="menu-count" role="status">
          Showing {visibleItems.length}{" "}
          {visibleItems.length === 1 ? "dish" : "dishes"}
        </p>

        <button type="button" className="menu-clear" onClick={clearFilters}>
          Clear filters
        </button>
      </div>

      {visibleItems.length > 0 ? (
        <div className="menu-grid">
          {visibleItems.map((item, index) => (
            <DishCard
              key={item.id}
              dish={item}
              querySuffix={querySuffix}
              imageLoading={index < 3 ? "eager" : "lazy"}
            />
          ))}
        </div>
      ) : (
        <div className="menu-empty">
          <h3>No dishes match your choices.</h3>
          <p>Try another search or clear your filters.</p>
        </div>
      )}
    </section>
  );
}

export default Menu;
