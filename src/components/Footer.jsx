import { Link } from 'react-router';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="site-footer">
      <div className="footer-content">
        <div>
          <h2>Saffron & Stone</h2>
          <p>A neighborhood table with Mediterranean warmth.</p>
          <p className="footer-note">
            Fictional restaurant · Class project
          </p>
        </div>

        <div>
          <h3>Contact</h3>
          <address>
            <p>12 Olive Lane, Sample Town</p>
            <p>Phone: 01-0000000 (sample)</p>
            <p>
              <a href="mailto:hello@saffronstone.example">
                hello@saffronstone.example
              </a>
            </p>
          </address>
          <p className="footer-note">
            Sample contact details; the email address is a placeholder.
          </p>
        </div>

        <div>
          <h3>Opening Hours</h3>
          <p>Daily: 12:00–22:00</p>
          <p>Last reservation time: 21:00</p>
          <Link to="/reservations">Request a table</Link>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {currentYear} Saffron & Stone · Class project</p>
        <a href="#main-content">Back to top</a>
      </div>
    </footer>
  );
}

export default Footer;