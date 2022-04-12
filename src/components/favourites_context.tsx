import React, { useState, useContext } from "react";
import { FAVOURITE_CONTEXT } from "../types";
import { DisneyCharacter } from "../disney_character";

interface Props {
  children: React.ReactNode;
}

const FavouritesContext = React.createContext<FAVOURITE_CONTEXT>({
  characterFavourites: [],
  setCharacterFavourites: () => {},
});

export function useFavouritesContext() {
  return useContext(FavouritesContext);
}

export function FavouritesProvider({ children }: Props) {
  const [characterFavourites, setCharacterFavourites] = useState<
    DisneyCharacter[]
  >([]);

  return (
    <FavouritesContext.Provider
      value={{
        characterFavourites: characterFavourites,
        setCharacterFavourites: setCharacterFavourites,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
}
