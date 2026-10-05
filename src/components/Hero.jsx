import './Hero.css'

function Hero () {
    return (
        <section id="hero" className="hero">
            <div className="hero-content">
                <p className="hero-label"> Your neihbourhood Mediterranean kitchen</p>

                <h1>Warm flavours. A welcoming table</h1>

                <p className="hero-description">
                    Handcrafted dishes, earthy ingredients, and a little saffron warmth.
                    Gather around our table at Saffron & Stone.
                </p>

                <div className="hero-action">
                    <a href="#menu" className="hero-button hero-button-primary">
                        View menu
                    </a>

                    <a href="#reservation" className="hero-button hero-button-secondary">
                        Reserve a table
                    </a>
                </div>
            </div>

            <img src="/images/Saffron & Stone.png" alt="Saffron $ Stone restaurant logo" className="hero-logo"/>
        </section>
    );
}

export default Hero;