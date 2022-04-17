import React from "react";
import { useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  React.useEffect(() => {
    setName(currentUser && name);
    setLink(currentUser && link);
  }, [currentUser]);

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
      submitButton="Add"
      isOpen={props.isOpen}
      onClose={props.onClose}
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
        onChange={handleLinkChange}
      />
      <span id="place-img-input-error"></span>
      <button type="submit" className="popup__button" onClick={handleSubmit}>
        Add
      </button>
    </PopupWithForm>
  );
}
