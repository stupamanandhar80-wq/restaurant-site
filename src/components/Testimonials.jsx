import testimonials from '../data/testimonials.js';
import './Testimonials.css';

function TestimonialCard({ name, quote }) {
  return (
    <figure className="testimonial-card">
      <blockquote>
        <p>{quote}</p>
      </blockquote>

      <figcaption>— {name}</figcaption>
    </figure>
  );
}

function Testimonials() {
  return (
    <section id="testimonials" className="testimonials">
      <h2>Around Our Table</h2>
      <p>Fictional guest reviews for this class project.</p>

      <div className="testimonials-grid">
        {testimonials.map((review) => (
          <TestimonialCard
            key={review.id}
            name={review.name}
            quote={review.quote}
          />
        ))}
      </div>
    </section>
  );
}

export default Testimonials;