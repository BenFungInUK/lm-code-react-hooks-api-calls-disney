import "./App.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Header from "./components/header";
import CharacterContainer from "./components/character_container";
import Navigation from "./components/navigation";
import { DisneyCharacter } from "./disney_character";

export const FavouritesContext = React.createContext<number[]>([]);

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [characters, setCharacters] = useState<Array<DisneyCharacter>>([]);
  const [characterFavourites, setCharacterFavourites] = useState<number[]>([]);
  useEffect(() => {
    getCharacters(currentPage);
  }, [currentPage]);

  const getCharacters = async (pageNumber: number) => {
    // Utilised Axios for API calls
    const apiResponse = await axios.get(
      `http://api.disneyapi.dev/characters?page=${pageNumber}`
    );
    setCharacters(apiResponse.data.data);
  };
  // // Some dummy state representing disney characters
  // const [characters, setCharacters] = useState<Array<DisneyCharacter>>([
  //   {
  //     _id: 6,
  //     name: "'Olu Mel",
  //     imageUrl: "https://static.wikia.nocookie.net/disney/images/6/61/Olu_main.png"
  //   },
  //   {
  //     _id: 25,
  //     name: "Abu",
  //     imageUrl: "https://static.wikia.nocookie.net/disney/images/3/3f/Profile_-_Abu.png"
  //   },
  //   {
  //     _id: 30,
  //     name: "Ace",
  //     imageUrl: "https://static.wikia.nocookie.net/disney/images/1/1e/Profile_-_Ace.png"
  //   },
  // ]);

  return (
    <FavouritesContext.Provider value={characterFavourites}>
      <div className="page">
        <Header currentPage={currentPage} />
        <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <CharacterContainer
          characters={characters}
          updateFavourites={setCharacterFavourites}
        />
      </div>
    </FavouritesContext.Provider>
  );
};

export default App;
