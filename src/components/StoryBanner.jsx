import { Link } from 'react-router';
import './StoryBanner.css';

function StoryBanner() {
  return (
    <section className="story-banner" aria-labelledby="story-heading">
      <div className="story-content">
        <p className="story-label">The spirit of Saffron & Stone</p>

        <h2 id="story-heading">A place to slow down and share.</h2>

        <p>
          Saffron brings the warmth. Stone brings the grounding.
          Our table brings people together over generous dishes
          and the simple pleasure of eating well.
        </p>

        <Link to="/reservations">Find your place at our table</Link>
      </div>
    </section>
  );
}

export default StoryBanner;