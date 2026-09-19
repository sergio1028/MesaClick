import { Outlet, NavLink } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useFavoritos } from "../context/FavoritosContext"

function Layout() {
    const { favoritos } = useFavoritos();
  return (
    <>
      <Header />

      <nav>
        <NavLink to="/">Inicio</NavLink>
        <NavLink to="/catalogo">Catálogo</NavLink>
        <NavLink to="/favoritos">Favoritos ({favoritos.length})</NavLink>
      </nav>

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

export default Layout;