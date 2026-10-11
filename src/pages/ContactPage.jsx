import { Link } from 'react-router';

function ContactPage() {
  return (
    <section className="page-intro">
      <h1>Visit Our Table</h1>

      <h2>Find us</h2>
      <p>12 Olive Lane, Sample Town</p>

      <h2>Opening hours</h2>
      <p>Daily: 12:00–22:00</p>
      <p>Last reservation time: 21:00</p>

      <h2>Get in touch</h2>
      <p>
        <a href="mailto:hello@saffronstone.example">
          hello@saffronstone.example
        </a>
      </p>

      <p>
        These are fictional contact details for this class project.
      </p>

      <Link to="/reservations">Go to reservations</Link>
    </section>
  );
}

export default ContactPage;