function App() {
  return (
    <>
      <header>
        <p>Saffron and Stone</p>

        <nav aria-label="Main Navigation">
          <a href="#menu">Menu</a>
          <a href="#reservation">Reservation</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main>
        <section id="hero">
          <h1>Welcome to Saffron & Stone</h1>
          <p>A neighbourhood table with Mediterranean warmth.</p>
          <a href="#menu">View the menu</a>
          <a href="#reservation">Reserve a table</a>
        </section>
        <section id="#menu">
          <h2>Our menu</h2>
          <p>Our Dishes will Go here</p> 
        </section>
         <section id="reservation">
          <h2>Reserve a Table</h2>
          <p>Our reservation form will go here.</p>
        </section>
        <section id="testimonials">
          <h2>What Guests Say</h2>
          <p>Guest testimonials will go here.</p>
        </section>    
      </main>
      <footer id="contact">
        <h2>Contact & Opening Hours</h2>
        <p>Our Sample contact information will go here.</p>
      </footer>
    </>
  )
}

export default App
