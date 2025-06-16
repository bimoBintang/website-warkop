const Hero = () => {
  const scrollToMenu = () => {
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <h1 className="hero-title">Warkop Nusantara</h1>
        <p className="hero-subtitle">
          Nikmati cita rasa kopi tradisional dengan suasana yang hangat dan bersahabat
        </p>
        <button className="cta-button" onClick={scrollToMenu}>
          <i className="fas fa-coffee"></i>
          Lihat Menu
        </button>
      </div>
      <div className="hero-decoration">
        <div className="coffee-bean bean-1"></div>
        <div className="coffee-bean bean-2"></div>
        <div className="coffee-bean bean-3"></div>
      </div>
    </section>
  );
};

export default Hero;