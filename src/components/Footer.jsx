function Footer() {
  const anio = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>© {anio} Sergio Andres Galeano - Todos los derechos reservados.</p>
    </footer>
  );
}

export default Footer;