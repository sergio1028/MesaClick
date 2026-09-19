
import { createContext, useContext, useState } from "react";

const FavoritosContext = createContext();

export function FavoritosProvider({ children }) {
  const [favoritos, setFavoritos] = useState([]);

  const agregarFavorito = (producto) => {
    setFavoritos([...favoritos, producto]);
  };

  const quitarFavorito = (id) => {
    setFavoritos(favoritos.filter((producto) => producto.id !== id));
  };

  return (
    <FavoritosContext.Provider
      value={{ favoritos, agregarFavorito, quitarFavorito }}
    >
      {children}
    </FavoritosContext.Provider>
  );
}

export function useFavoritos() {
  return useContext(FavoritosContext);
}

