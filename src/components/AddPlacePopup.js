import React from "react";
import { useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup(props) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  React.useEffect(() => {
    setLink("");
    setName("");
  }, [props.isOpen]);

  function handleNameChange(event) {
    setName(event.target.value);
  }
  function handleLinkChange(event) {
    setLink(event.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onAddPlaceSubmit({ name, link });
  }
  return (
    <PopupWithForm
      name="place"
      title="Add place"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonText="add"
    >
      <input
        id="place-title-input"
        name="placeHeading"
        type="text"
        placeholder="Title"
        className="popup__input popup__input_field_heading"
        minLength="1"
        maxLength="30"
        required
        value={name}
        onChange={handleNameChange}
      />
      <span id="place-title-input-error"></span>
      <input
        id="place-img-input"
        name="placeImage"
        type="url"
        placeholder="Image Url"
        className="popup__input popup__input_field_img"
        required
        value={link}
        onChange={handleLinkChange}
      />
      <span id="place-img-input-error"></span>
    </PopupWithForm>
  );
}
