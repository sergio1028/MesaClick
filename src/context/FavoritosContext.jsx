
import { createContext, useContext, useState } from "react";

const FavoritosContext = createContext();

export function FavoritosProvider({ children }) {
  const [favoritos, setFavoritos] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("mesaclick_favoritos")) || [];
    } catch {
      return [];
    }
  });

  const guardarFavoritos = (nuevosFavoritos) => {
    setFavoritos(nuevosFavoritos);
    localStorage.setItem(
      "mesaclick_favoritos",
      JSON.stringify(nuevosFavoritos)
    );
  };

  const agregarFavorito = (producto) => {
    guardarFavoritos(
      favoritos.some((item) => item.id === producto.id)
        ? favoritos
        : [...favoritos, producto]
    );
  };

  const quitarFavorito = (id) => {
    guardarFavoritos(
      favoritos.filter((producto) => producto.id !== id)
    );
  };

  const actualizarFavorito = (productoActualizado) => {
    guardarFavoritos(
      favoritos.map((producto) =>
        producto.id === productoActualizado.id
          ? productoActualizado
          : producto
      )
    );
  };

  return (
    <FavoritosContext.Provider
      value={{
        favoritos,
        agregarFavorito,
        quitarFavorito,
        actualizarFavorito,
      }}
    >
      {children}
    </FavoritosContext.Provider>
  );
}

export function useFavoritos() {
  return useContext(FavoritosContext);
}
