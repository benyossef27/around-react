import avatar_edit from "../images/profile/profile__popup-button.svg";
import React, { useEffect, useState } from "react";
import { api } from "../utils/Api";
import Card from "./Card";

export default function Main({
  onEditProfileClick,
  onEditAvatarClick,
  onAddPlaceClick,
  onDeleteClick,
  onCardClick,
}) {
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [cards, setCards] = useState([]);
  useEffect(() => {
    api
      .getUserInfo()
      .then((userData) => {
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
    api
      .getInitialCards()
      .then((cardsData) => {
        setCards(cardsData);
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  }, []);
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-box" onClick={onEditAvatarClick}>
          <img
            className="profile__avatar"
            style={{ backgroundImage: `url(${userAvatar})` }}
          />
          <img className="profile__avatar-edit" src={avatar_edit} />
        </div>
        <div className="profile__details">
          <h1 className="profile__name">{userName}</h1>
          <p className="profile__job">{userDescription}r</p>
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
          />
        ))}
      </section>
    </main>
  );
}
