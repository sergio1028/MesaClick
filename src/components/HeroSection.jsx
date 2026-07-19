import hero from "../assets/hero.jpg";

function HeroSection() {
  const mensaje = "Gestiona los pedidos de tu restaurante de forma rápida y sencilla";

  return (
    <section className="hero">
      <h2>{mensaje}</h2>

      <p>
        MesaClick permite registrar pedidos, organizar la atención de las mesas
        y mejorar el servicio al cliente.
      </p>

      <img src={hero} alt="Restaurante" />
    </section>
  );
}

export default HeroSection;