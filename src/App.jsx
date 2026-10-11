import { Link, Route, Routes } from 'react-router';

import PageNavigation from './components/PageNavigation.jsx';

import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

import HomePage from './pages/HomePage.jsx';
import MenuPage from './pages/MenuPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ReservationsPage from './pages/ReservationsPage.jsx';
import ContactPage from './pages/ContactPage.jsx';

function App() {
  return (
    <>
      <PageNavigation />
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <Header />

      <main id="main-content" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route
            path="/reservations"
            element={<ReservationsPage />}
          />
          <Route path="/contact" element={<ContactPage />} />

          <Route
            path="*"
            element={
              <section className="page-intro">
                <h1>Page not found</h1>
                <p>We could not find that page.</p>
                <Link to="/">Return home</Link>
              </section>
            }
          />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;