import { Link } from 'react-router';
import './Hero.css';

function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero-content">
        <p className="hero-label">
          Mediterranean flavors. Neighborhood warmth.
        </p>

        <h1>Good food.<br />Even better company.</h1>

        <p className="hero-description">
          Gather around for saffron-scented rice, fresh flatbreads,
          and dishes made to share.
        </p>

        <div className="hero-actions">
          <Link className="hero-button hero-button-primary" to="/menu">
            Explore the Menu
          </Link>

          <Link
            className="hero-button hero-button-secondary" to="/reservations"
          >
            Reserve a Table
          </Link>
          
        </div>
      </div>
    </section>
  );
}

export default Hero;