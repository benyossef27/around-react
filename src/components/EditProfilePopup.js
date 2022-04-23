import { useState } from "react";
import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [inputs, setInputs] = useState({});

  React.useEffect(() => {
    setInputs(currentUser);
  }, [currentUser, props.isOpen]);

  function handleinputs(event) {
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser({
      name: inputs.name,
      about: inputs.about,
    });
  }

  return (
    <PopupWithForm
      name="edit"
      title="Edit profile"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonText={props.buttonText}
    >
      <input
        id="name-input"
        name="name"
        type="text"
        placeholder="Name"
        className="popup__input popup__input_field_name"
        minLength="2"
        maxLength="40"
        required
        value={inputs.name || ""}
        onChange={handleinputs}
      />
      <span id="name-input-error"></span>
      <input
        id="job-input"
        name="about"
        type="text"
        placeholder="About me"
        className="popup__input popup__input_field_job"
        minLength="2"
        maxLength="200"
        required
        value={inputs.about || ""}
        onChange={handleinputs}
      />
      <span id="job-input-error"></span>
    </PopupWithForm>
  );
}
