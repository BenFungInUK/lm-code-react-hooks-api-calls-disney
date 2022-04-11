import { DisneyCharacter } from "../disney_character";

// character.tsx
interface CharacterProps {
  character: DisneyCharacter;
  characterFavourites: Array<number>;
  updateFavourites: (favourites: Array<number>) => void;
}

// notice we're updating the props destructuring to access the two new props too:
const Character: React.FC<CharacterProps> = ({
  character,
  characterFavourites,
  updateFavourites,
}) => {
  // Define a default in case the character doesn't have an image
  let imageSrc = "https://picsum.photos/300/200/?blur";
  if (character.imageUrl.indexOf("/revision") !== -1) {
    // API seems to include extra path for images so here we strip it off to fetch raw image
    imageSrc = character.imageUrl.substring(
      0,
      character.imageUrl.indexOf("/revision")
    );
  } else if (character.imageUrl) {
    imageSrc = character.imageUrl;
  }

  function toggleFavouriteForCharacter(characterId: number) {
    if (!characterFavourites.includes(characterId)) {
      // add to favourites
      updateFavourites([...characterFavourites, characterId]);
    } else {
      // remove from favourites
      const updatedFavourites = characterFavourites.filter(
        (id) => id !== characterId
      );
      updateFavourites(updatedFavourites);
    }
  }

  return (
    <article className="character-item">
      <h2>{character.name}</h2>

      <div
        className="character-item__actions"
        onClick={() => toggleFavouriteForCharacter(character._id)}
      >
        {!characterFavourites.includes(character._id)
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
