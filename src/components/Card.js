import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card({ onCardClick, card, onDeleteClick, onCardLike }) {
  const currentUser = React.useContext(CurrentUserContext);
  function handleClick() {
    onCardClick(card);
  }
  function handleLikeClick() {
    onCardLike(card);
  }
  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `card__delete-button ${
    isOwn ? "" : "card__delete-button_hidden"
  }`;
  const isLiked = card.likes.some((user) => user._id === currentUser._id);
  const cardLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_black" : ""
  }`;
  return (
    <div className="card">
      <div
        className="card__image"
        onClick={handleClick}
        style={{ backgroundImage: `url(${card.link})` }}
        aria-label={card.name}
      ></div>
      <button
        className={cardDeleteButtonClassName}
        type="button"
        aria-label="delete"
        onClick={onDeleteClick}
      />
      <div className="card__box">
        <h2 className="card__name">{card.name}</h2>
        <div className="card__like-box">
          <button
            aria-label="like"
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleLikeClick}
          />
          <p className="card__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}
