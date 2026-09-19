
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import { useFavoritos } from "./context/FavoritosContext";

function Catalogo() {
  const { favoritos, agregarFavorito, quitarFavorito } = useFavoritos();

  const [busqueda, setBusqueda] = useState("");

  const productos = [
  {
    id: 1,
    nombre: "Hamburguesa Clásica",
    precio: 18000,
    descripcion: "Hamburguesa con carne, queso, lechuga y tomate.",
  },
  {
    id: 2,
    nombre: "Pizza Personal",
    precio: 22000,
    descripcion: "Pizza personal con queso, jamón y pepperoni.",
  },
];

const productosFiltrados = productos.filter((producto) =>
  producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
);

  return (
    <div>
      <h1>Catálogo</h1>
      <input
  type="text"
  placeholder="Buscar producto"
  value={busqueda}
  onChange={(e) => setBusqueda(e.target.value)}
/>

     {productosFiltrados.map((producto) => (
  <div key={producto.id}>
    <h2>{producto.nombre}</h2>
    <p>{producto.descripcion}</p>
    <p>${producto.precio}</p>

    {favoritos.some((favorito) => favorito.id === producto.id) ? (
      <button onClick={() => quitarFavorito(producto.id)}>
        Quitar de favoritos
      </button>
    ) : (
      <button onClick={() => agregarFavorito(producto)}>
        Agregar a favoritos
      </button>
    )}
  </div>
))}
    </div>
  );
}

function Favoritos() {
  const { favoritos, quitarFavorito } = useFavoritos();

  return (
    <div>
      <h1>Favoritos</h1>

      {favoritos.length === 0 ? (
        <p>No tienes favoritos todavía.</p>
      ) : (
        favoritos.map((producto) => (
          <div key={producto.id}>
            <h2>{producto.nombre}</h2>
            <button onClick={() => quitarFavorito(producto.id)}>
              Quitar de favoritos
            </button>
          </div>
        ))
      )}
    </div>
  );
}



function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="catalogo" element={<Catalogo />} />
        <Route path="favoritos" element={<Favoritos />} />
      </Route>
    </Routes>
  );
}

export default App;