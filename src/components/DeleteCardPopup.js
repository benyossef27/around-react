import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function DeleteCardPopup(props) {
  function handleSubmit(evt) {
    evt.preventDefault();
    props.onCardDelete(props.card);
  }

  return (
    <PopupWithForm
      name="deleteCard"
      title="Are you sure?"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonText={props.buttonText}
    />
  );
}
