import { DisneyCharacter } from "./disney_character";

export type FAVOURITE_CONTEXT = {
  characterFavourites: DisneyCharacter[];
  setCharacterFavourites: React.Dispatch<
    React.SetStateAction<DisneyCharacter[]>
  >;
};
