
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import RutaProtegida from "./components/RutaProtegida";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import { useFavoritos } from "./context/FavoritosContext";

const productosIniciales = [
  { id: 1, nombre: "Hamburguesa Clásica" },
  { id: 2, nombre: "Pizza Personal" },
];

function Catalogo() {
  const {
    favoritos,
    agregarFavorito,
    quitarFavorito,
    actualizarFavorito,
  } = useFavoritos();

  const [productos, setProductos] = useState(() => {
    try {
      const guardados = localStorage.getItem("mesaclick_productos");
      return guardados
        ? JSON.parse(guardados)
        : productosIniciales;
    } catch {
      return productosIniciales;
    }
  });

  const [busqueda, setBusqueda] = useState("");
  const [nombre, setNombre] = useState("");
  const [editando, setEditando] = useState(null);

  function guardarProductos(nuevosProductos) {
    setProductos(nuevosProductos);
    localStorage.setItem(
      "mesaclick_productos",
      JSON.stringify(nuevosProductos)
    );
  }

  function guardarProducto(e) {
    e.preventDefault();

    const nombreLimpio = nombre.trim();

    if (!nombreLimpio) return;

    if (editando !== null) {
      const productoActualizado = {
        id: editando,
        nombre: nombreLimpio,
      };

      guardarProductos(
        productos.map((producto) =>
          producto.id === editando
            ? productoActualizado
            : producto
        )
      );

      actualizarFavorito(productoActualizado);
    } else {
      const nuevoProducto = {
        id: Date.now(),
        nombre: nombreLimpio,
      };

      guardarProductos([...productos, nuevoProducto]);
    }

    setNombre("");
    setEditando(null);
  }

  function editarProducto(producto) {
    setNombre(producto.nombre);
    setEditando(producto.id);
  }

  function eliminarProducto(id) {
    guardarProductos(
      productos.filter((producto) => producto.id !== id)
    );

    quitarFavorito(id);

    if (editando === id) {
      setNombre("");
      setEditando(null);
    }
  }

  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <section
      className="catalogo-mesaclick"
      style={{ textAlign: "center", maxWidth: "900px", margin: "30px auto" }}
    >
      <h1>Menú de MesaClick</h1>

      <form onSubmit={guardarProducto}>
        <input
          type="text"
          placeholder="Nombre del producto"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <button type="submit">
          {editando !== null
            ? "Guardar cambios"
            : "Agregar producto"}
        </button>

        {editando !== null && (
          <button
            type="button"
            onClick={() => {
              setNombre("");
              setEditando(null);
            }}
          >
            Cancelar
          </button>
        )}
      </form>

      <input
        type="search"
        placeholder="Buscar producto..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      <div className="lista-productos">
        {productosFiltrados.map((producto) => (
          <article
            className="tarjeta-producto"
            key={producto.id}
            style={{ margin: "20px auto", padding: "20px" }}
          >
            <h2>{producto.nombre}</h2>

            <button onClick={() => editarProducto(producto)}>
              Editar
            </button>

            <button onClick={() => eliminarProducto(producto.id)}>
              Eliminar
            </button>

            {favoritos.some((item) => item.id === producto.id) ? (
              <button onClick={() => quitarFavorito(producto.id)}>
                Quitar de favoritos
              </button>
            ) : (
              <button onClick={() => agregarFavorito(producto)}>
                Agregar a favoritos
              </button>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

function Favoritos() {
  const { favoritos, quitarFavorito } = useFavoritos();
  const [busqueda, setBusqueda] = useState("");

  const favoritosFiltrados = favoritos.filter((producto) =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <section
      style={{ textAlign: "center", maxWidth: "900px", margin: "30px auto" }}
    >
      <h1>Mis favoritos</h1>

      <input
        type="search"
        placeholder="Buscar favorito..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      {favoritosFiltrados.length === 0 ? (
        <p>No hay productos favoritos.</p>
      ) : (
        favoritosFiltrados.map((producto) => (
          <article key={producto.id} style={{ margin: "20px auto" }}>
            <h2>{producto.nombre}</h2>

            <button onClick={() => quitarFavorito(producto.id)}>
              Quitar de favoritos
            </button>
          </article>
        ))
      )}
    </section>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />

      <Route element={<RutaProtegida />}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="catalogo" element={<Catalogo />} />
          <Route path="favoritos" element={<Favoritos />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
