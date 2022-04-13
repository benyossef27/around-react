import avatar_edit from "../images/profile/profile__popup-button.svg";
import React, { useEffect, useState } from "react";
import { api } from "../utils/Api";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Main({
  onEditProfileClick,
  onEditAvatarClick,
  onAddPlaceClick,
  onDeleteClick,
  onCardClick,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .getInitialCards()
      .then((cardsData) => {
        setCards(cardsData);
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  }, []);
  function handleCardLike(card) {
    const isLiked = card.likes.some((user) => user._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) =>
        state.map((currentCard) =>
          currentCard._id === card._id ? newCard : currentCard
        )
      );
    });
  }
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-box" onClick={onEditAvatarClick}>
          <img
            className="profile__avatar"
            style={{ backgroundImage: `url(${currentUser.avatar})` }}
          />
          <img className="profile__avatar-edit" src={avatar_edit} />
        </div>
        <div className="profile__details">
          <h1 className="profile__name">{currentUser.name}</h1>
          <p className="profile__job">{currentUser.about}r</p>
        </div>
        <button
          className="profile__popup-button"
          aria-label="popupen"
          type="button"
          onClick={onEditProfileClick}
        ></button>
        <button
          className="profile__add-button"
          aria-label="addbutton"
          type="button"
          onClick={onAddPlaceClick}
        ></button>
      </section>
      <section className="cards">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onDeleteClick={onDeleteClick}
            onCardLike={handleCardLike}
          />
        ))}
      </section>
    </main>
  );
}
