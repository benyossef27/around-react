import React from "react";
import { useState } from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup(props) {
  const avatarRef = React.useRef("");
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Edit avatar"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonText={props.buttonText}
    >
      <input
        id="avatar-img-input"
        name="avatarImage"
        type="url"
        placeholder="Image Url"
        className="popup__input popup__input_field_img"
        required
        ref={avatarRef}
      />
      <span id="avatar-img-input-error"></span>
    </PopupWithForm>
  );
}
