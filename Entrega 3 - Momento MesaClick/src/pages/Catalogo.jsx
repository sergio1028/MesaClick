import { useEffect, useState } from 'react';
import { useFavorites } from '../context/FavoritesContext';
import api from '../services/api';

export default function Catalogo() {
  const [busqueda, setBusqueda] = useState('');
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('Platos');
  const [error, setError] = useState('');
  const [editando, setEditando] = useState(null);

  const { favorites, toggleFavorite } = useFavorites();

  async function cargar() {
    try {
      const { data } = await api.get('/productos');
      setProductos(data);
      setError('');
    } catch {
      setError('No se pudieron cargar los productos.');
    }
  }

  useEffect(() => {
    cargar();
  }, []);

  async function guardar(e) {
    e.preventDefault();

    try {
      if (editando) {
        await api.put(`/productos/${editando}`, {
          nombre,
          categoria
        });
      } else {
        await api.post('/productos', {
          nombre,
          categoria
        });
      }

      setNombre('');
      setCategoria('Platos');
      setEditando(null);
      setError('');
      await cargar();
    } catch (err) {
      setError(
        err.response?.data?.mensaje || 'No se pudo guardar el producto.'
      );
    }
  }

  function prepararEdicion(producto) {
    setEditando(producto._id || producto.id);
    setNombre(producto.nombre);
    setCategoria(producto.categoria);
  }

  function cancelarEdicion() {
    setEditando(null);
    setNombre('');
    setCategoria('Platos');
    setError('');
  }

  async function eliminar(id) {
    if (!window.confirm('¿Seguro que deseas eliminar este producto?')) return;

    try {
      await api.delete(`/productos/${id}`);
      await cargar();
    } catch {
      setError('No se pudo eliminar el producto.');
    }
  }

  const filtrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <section>
      <h1>Nuestro menú</h1>
      <p>Descubre y administra los platos y bebidas de MesaClick.</p>

      <input
        aria-label="Buscar producto"
        placeholder="Buscar platos o bebidas..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      <form className="product-form" onSubmit={guardar}>
        <h2>{editando ? 'Editar producto' : 'Agregar al menú'}</h2>

        <input
          aria-label="Nombre del producto"
          placeholder="Nombre del plato o bebida"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <select
          aria-label="Categoría"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        >
          <option>Platos</option>
          <option>Entradas</option>
          <option>Bebidas</option>
          <option>Postres</option>
        </select>

        <button type="submit">
          {editando ? 'Guardar cambios' : 'Agregar producto'}
        </button>

        {editando && (
          <button type="button" className="danger" onClick={cancelarEdicion}>
            Cancelar edición
          </button>
        )}
      </form>

      {error && <p role="alert">{error}</p>}

      <div className="product-grid">
        {filtrados.map((p) => {
          const id = p._id || p.id;

          return (
            <article className="product-card" key={id}>
              <h2>{p.nombre}</h2>
              <p>Categoría: {p.categoria}</p>

              <button
                onClick={() =>
                  toggleFavorite({
                    id,
                    nombre: p.nombre,
                    categoria: p.categoria
                  })
                }
              >
                {favorites.some((f) => f.id === id)
                  ? 'Quitar de favoritos'
                  : 'Agregar a favoritos'}
              </button>

              <button onClick={() => prepararEdicion(p)}>
                Editar
              </button>

              <button
                className="danger"
                onClick={() => eliminar(id)}
              >
                Eliminar
              </button>
            </article>
          );
        })}
      </div>

      {!filtrados.length && !error && (
        <p>No hay productos para mostrar. ¡Agrega el primero!</p>
      )}
    </section>
  );
}