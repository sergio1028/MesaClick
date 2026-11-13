import { Link } from "react-router-dom";

export default function Inicio() {
  return (
    <div className="home-page">
      <section className="hero-home">
        <div className="hero-text">
          <span className="hero-badge">BIENVENIDO A MESACLICK</span>

          <h1>
            Tu comida favorita,
            <br />
            <span>a un clic de distancia.</span>
          </h1>

          <p>
            Descubre nuestro menú, explora deliciosos platos,
            bebidas y postres. Administra tus favoritos
            fácilmente desde un solo lugar.
          </p>

          <div className="hero-actions">
            <Link to="/catalogo" className="hero-primary">
              Explorar menú
            </Link>

            <Link to="/favoritos" className="hero-secondary">
              Ver favoritos
            </Link>
          </div>
        </div>

        <div className="hero-card">
          <div className="hero-icon">🍔</div>

          <h2>Bienvenido a MesaClick</h2>

          <p>
            Explora sabores, encuentra tus platos favoritos
            y disfruta una experiencia sencilla.
          </p>
        </div>
      </section>

      <section className="features">
        <div className="feature-card">
          <div className="feature-icon">🍕</div>
          <h2>Explora</h2>
          <p>
            Descubre diferentes platos y opciones de nuestro menú.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">❤️</div>
          <h2>Favoritos</h2>
          <p>
            Guarda tus productos preferidos para encontrarlos fácilmente.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">⚡</div>
          <h2>Fácil de usar</h2>
          <p>
            Disfruta una plataforma sencilla, rápida y organizada.
          </p>
        </div>
      </section>
    </div>
  );
}