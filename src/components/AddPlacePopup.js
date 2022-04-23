import React from "react";
import { useState } from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup(props) {
  const [inputs, setInputs] = useState({});

  React.useEffect(() => {
    setInputs({});
  }, [props.isOpen]);

  function handleinputs(event) {
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onAddPlaceSubmit({ name: inputs.name, link: inputs.link });
  }
  return (
    <PopupWithForm
      name="place"
      title="Add place"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonText={props.buttonText}
    >
      <input
        id="place-title-input"
        name="name"
        type="text"
        placeholder="Title"
        className="popup__input popup__input_field_heading"
        minLength="1"
        maxLength="30"
        required
        value={inputs.name || ""}
        onChange={handleinputs}
      />
      <span id="place-title-input-error"></span>
      <input
        id="place-img-input"
        name="link"
        type="url"
        placeholder="Image Url"
        className="popup__input popup__input_field_img"
        required
        value={inputs.link || ""}
        onChange={handleinputs}
      />
      <span id="place-img-input-error"></span>
    </PopupWithForm>
  );
}
