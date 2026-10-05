import { useState } from "react";
import menuItems from "../data/menu";
import './Menu.css'

const categories = ['All', 'Starters', 'Mains', 'Desserts'];

function Menu () {
    
    const [selectedCategory, setSelectedCategory] = useState('All');

    const visibleItems = menuItems.filter((item) => {
        return selectedCategory == 'All' || item.category === selectedCategory;
    });

    return (
        <section id="menu" className="restaurant-menu">
            <h2>Our menu</h2>
            <p>Made for sharing, savoring, and coming back for</p>

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
                ))};
            </div>

            <p className="menu-count" aria-live="polite">
                Showing {visibleItems.length} dishes
            </p>

            <div className="menu-grid">
                {visibleItems.map((item) => (
                    <article className="menu-card" key={item.id}>
                        <p className="menu-category"> {item.category}</p>
                        <h3>{item.name}</h3>
                        <p className="menu-description">{item.description}</p>
                        <p className="menu-price">Rs {item.price}</p>
                    </article>
                ))}
            </div>
        </section>
    );
}

export default Menu;