export default function Card({ onCardClick, card, onDeleteClick }) {
  function handleClick() {
    onCardClick(card);
  }
  return (
    <div className="card">
      <img
        className="card__image"
        onClick={handleClick}
        style={{ backgroundImage: `url(${card.link})` }}
      />
      <button
        className="card__delete-button"
        type="button"
        aria-label="delete"
        onClick={onDeleteClick}
      ></button>
      <div className="card__box">
        <h2 className="card__name">{card.name}</h2>
        <div className="card__like-box">
          <button
            aria-label="like"
            className="card__like-button"
            type="submit"
          ></button>
          <p className="card__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}
