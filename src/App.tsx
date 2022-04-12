import "./App.css";
import axios from "axios";
import React, { useState, useEffect, useReducer, useCallback } from "react";
import Header from "./components/header";
import CharacterContainer from "./components/character_container";
import Navigation from "./components/navigation";
import { DisneyCharacter } from "./disney_character";
import { useFavouritesContext } from "./components/favourites_context";
import { pageReducer } from "./reducer/page_reducer";

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useReducer(pageReducer, "1");
  const [characters, setCharacters] = useState<Array<DisneyCharacter>>([]);
  const { characterFavourites } = useFavouritesContext();

  const togglePage = useCallback(
    (page: string) => {
      if (page === "favourite") {
        setCharacters(characterFavourites);
      } else {
        getCharacters(parseInt(page));
      }
    },
    [characterFavourites]
  );

  const getCharacters = async (pageNumber: number) => {
    // Utilised Axios for API calls
    const apiResponse = await axios.get(
      `http://api.disneyapi.dev/characters?page=${pageNumber}`
    );
    setCharacters(apiResponse.data.data);
  };

  useEffect(() => {
    togglePage(currentPage);
  }, [currentPage, togglePage]);

  return (
    <div className="page">
      <Header currentPage={currentPage} />
      <Navigation setCurrentPage={setCurrentPage} />
      <CharacterContainer characters={characters} />
    </div>
  );
};

export default App;
