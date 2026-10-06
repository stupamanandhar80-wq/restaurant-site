import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Menu from './components/Menu.jsx';
import ReservationForm from './components/ReservationForm.jsx';
import Testimonials from './components/Testimonials.jsx';

function App() {
  return (
    <>
      <a href="#main-content" className='skip-link'>
        Skip to content
      </a>

      <Header />

      <main id='main-content' tabIndex={-1}>
        <Hero />
        <Menu />
        <ReservationForm />
        <Testimonials />
      </main>

            <Footer />
    </>
  )
}

export default App
