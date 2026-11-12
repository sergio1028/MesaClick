import { useFavorites } from "../context/FavoritesContext";

export default function Favoritos() {
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <section>
      <h1>Mis favoritos ❤️</h1>

      <p>
        Aquí encontrarás los platos y bebidas que más te gustan.
      </p>

      {favorites.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px 10px' }}>
          <div style={{ fontSize: '55px' }}>🍽️</div>
          <h2>¡Todavía no tienes favoritos!</h2>
          <p>Explora nuestro menú y guarda tus productos preferidos.</p>
        </div>
      ) : (
        <div className="product-grid">
          {favorites.map((producto) => (
            <article className="product-card" key={producto.id}>
              <h2>{producto.nombre}</h2>

              <p>Categoría: {producto.categoria}</p>

              <button
                className="danger"
                onClick={() => toggleFavorite(producto)}
              >
                ❤️ Quitar de favoritos
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}