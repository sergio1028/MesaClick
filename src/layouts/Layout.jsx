import { Outlet, NavLink, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useFavoritos } from "../context/FavoritosContext";
import { useAuth } from "../context/AuthContext";

function Layout() {
  const { favoritos } = useFavoritos();
  const { logout } = useAuth();
  const navigate = useNavigate();

  function cerrarSesion() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <>
      <Header />

      <nav className="header-nav">
        <NavLink to="/" className="nav-btn">
          Inicio
        </NavLink>

        <NavLink to="/catalogo" className="nav-btn">
          Menú
        </NavLink>

        <NavLink to="/favoritos" className="nav-btn">
          Favoritos ({favoritos.length})
        </NavLink>

        <button
          type="button"
          className="nav-btn logout-btn"
          onClick={cerrarSesion}
        >
          Cerrar sesión
        </button>
      </nav>

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

export default Layout;