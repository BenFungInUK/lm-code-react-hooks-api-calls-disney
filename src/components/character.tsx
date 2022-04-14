import React from "react";
import { DisneyCharacter } from "../disney_character";
import { useFavouritesContext } from "./favourites_context";

// character.tsx
interface CharacterProps {
  character: DisneyCharacter;
}

// notice we're updating the props destructuring to access the two new props too:
const Character: React.FC<CharacterProps> = ({ character }) => {
  // Define a default in case the character doesn't have an image
  const { characterFavourites, setCharacterFavourites } =
    useFavouritesContext();
  let imageSrc = "https://picsum.photos/300/200/?blur";
  if (character.imageUrl !== undefined) {
    if (character.imageUrl.indexOf("/revision") !== -1) {
      // API seems to include extra path for images so here we strip it off to fetch raw image
      imageSrc = character.imageUrl.substring(
        0,
        character.imageUrl.indexOf("/revision")
      );
    } else imageSrc = character.imageUrl;
  }

  function toggleFavouriteForCharacter(character: DisneyCharacter) {
    if (!characterFavourites.includes(character)) {
      // add to favourites
      setCharacterFavourites([...characterFavourites, character]);
    } else {
      // remove from favourites
      const updatedFavourites = characterFavourites.filter(
        (favChar) => favChar._id !== character._id
      );
      setCharacterFavourites(updatedFavourites);
    }
  }

  return (
    <article className="character-item">
      <h2>{character.name}</h2>

      <div
        className="character-item__actions"
        onClick={() => toggleFavouriteForCharacter(character)}
      >
        {characterFavourites.filter((fav) => fav._id === character._id)
          .length === 0
          ? "Add to Favourites"
          : "Favourited"}
      </div>

      <img
        className="character-item__img"
        src={imageSrc}
        alt={character.name}
      />
    </article>
  );
};

export default Character;
