import { PageAction } from "../action/page_action";
import { useState } from "react";
// our props have two properties - a number, and a function that takes a number and returns void
// we can define this as an interface, or anonymously like this:
const Navigation: React.FC<{ setCurrentPage: React.Dispatch<PageAction> }> = ({
  setCurrentPage,
}) => {
  const [favBtnText, setFavBtnText] = useState("Show Favourites");

  const nextPage = () => {
    setCurrentPage({ type: "next" });
    setFavBtnText("Show Favourites");
  };

  const prevPage = () => {
    setCurrentPage({ type: "prev" });
    setFavBtnText("Show Favourites");
  };

  const favPage = () => {
    setCurrentPage({ type: "favourite" });
    favBtnText === "Show Favourites"
      ? setFavBtnText("Show All")
      : setFavBtnText("Show Favourites");
  };

  return (
    <div className="navigation">
      <div className="navigation__item">
        <button className="navigation__button" onClick={prevPage}>
          Prev Page
        </button>
      </div>
      <div className="navigation__item">
        <button className="navigation__button" onClick={favPage}>
          {favBtnText}
        </button>
      </div>
      <div className="navigation__item">
        <button className="navigation__button" onClick={nextPage}>
          Next Page
        </button>
      </div>
    </div>
  );
};

export default Navigation;
