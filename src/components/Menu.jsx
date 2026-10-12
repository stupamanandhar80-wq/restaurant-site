import { useState } from 'react';
import menuItems from '../data/menu.js';
import './Menu.css';
import { Link } from 'react-router';

const categories = ['All', 'Starters', 'Mains', 'Desserts'];

function Menu() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [vegetarianOnly, setVegetarianOnly] = useState(false);
  const [sortOrder, setSortOrder] = useState('recommended');

  const normalizedSearch = searchTerm.trim().toLowerCase();

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      item.category === selectedCategory;

    const searchableText =
      `${item.name} ${item.description}`.toLowerCase();

    const matchesSearch = searchableText.includes(normalizedSearch);

    const matchesDiet = !vegetarianOnly || item.vegetarian === true;

    return matchesCategory && matchesSearch && matchesDiet;
  });

  const visibleItems = [...filteredItems];

  if (sortOrder === 'price-low') {
    visibleItems.sort((first, second) => first.price - second.price);
  } else if (sortOrder === 'price-high') {
    visibleItems.sort((first, second) => second.price - first.price);
  }

  function clearFilters() {
    setSelectedCategory('All');
    setSearchTerm('');
    setVegetarianOnly(false);
    setSortOrder('recommended');
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
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>

        <div className="menu-control">
          <label htmlFor="menu-sort">Sort dishes</label>
          <select
            id="menu-sort"
            value={sortOrder}
            onChange={(event) => setSortOrder(event.target.value)}
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
              setVegetarianOnly(event.target.checked)
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
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="menu-results-bar">
        <p className="menu-count" role="status">
          Showing {visibleItems.length}{' '}
          {visibleItems.length === 1 ? 'dish' : 'dishes'}
        </p>

        <button
          type="button"
          className="menu-clear"
          onClick={clearFilters}
        >
          Clear filters
        </button>
      </div>

      {visibleItems.length > 0 ? (
        <div className="menu-grid">
          {visibleItems.map((item) => (
            <article className="menu-card" key={item.id}>
              <p className="menu-category">{item.category}</p>
              <h3>
                <Link className="menu-dish-link" to={`/menu/${item.id}`}>
                  {item.name}
                </Link>
              </h3>

            <span
                className={`menu-badge ${
                    item.vegetarian ? 'menu-badge-veg' : 'menu-badge-nonveg'
                }`}
            >
                {item.vegetarian ? 'Vegetarian' : 'Non-vegetarian'}
            </span>

              <p className="menu-description">{item.description}</p>
              <p className="menu-price">NPR {item.price}</p>
            </article>
          ))}
        </div>
      ) : (
        <div className="menu-empty">
          <h3>No dishes match your choices.</h3>
          <p>Try another search or use Clear filters to see every dish.</p>
        </div>
      )}
    </section>
  );
}

export default Menu;