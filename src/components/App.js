import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { useState } from "react";

export default function App() {
  const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);
  const [isAvatarPopupOpen, setIsAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(undefined);

  function handleEditProfileClick() {
    setIsProfilePopupOpen(true);
  }
  function handleAvatarClick() {
    setIsAvatarPopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleDeleteClick() {
    setIsDeletePopupOpen(true);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closePopups() {
    setIsProfilePopupOpen(false);
    setIsAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeletePopupOpen(false);
    setSelectedCard(undefined);
  }
  return (
    <div className="page">
      <div className="root">
        <Header />
        <Main
          onEditProfileClick={handleEditProfileClick}
          onEditAvatarClick={handleAvatarClick}
          onAddPlaceClick={handleAddPlaceClick}
          onDeleteClick={handleDeleteClick}
          onCardClick={handleCardClick}
        />
        <PopupWithForm
          name="profile"
          title="Edit profile"
          submitButton="save"
          isOpen={isProfilePopupOpen}
          onClose={closePopups}
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
          />
          <span id="job-input-error"></span>
        </PopupWithForm>
        <PopupWithForm
          name="avatar"
          title="Edit avatar"
          submitButton="save"
          isOpen={isAvatarPopupOpen}
          onClose={closePopups}
        >
          <input
            id="avatar-img-input"
            name="avatarImage"
            type="url"
            placeholder="Image Url"
            className="popup__input popup__input_field_img"
            required
          />
          <span id="avatar-img-input-error"></span>
        </PopupWithForm>
        <PopupWithForm
          name="place"
          title="Add place"
          submitButton="Add"
          isOpen={isAddPlacePopupOpen}
          onClose={closePopups}
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
          />
          <span id="place-title-input-error"></span>
          <input
            id="place-img-input"
            name="placeImage"
            type="url"
            placeholder="Image Url"
            className="popup__input popup__input_field_img"
            required
          />
          <span id="place-img-input-error"></span>
        </PopupWithForm>
        <PopupWithForm
          name="preview"
          title="Are you sure?"
          submitButton="Yes"
          isOpen={isDeletePopupOpen}
          onClose={closePopups}
        ></PopupWithForm>
        <ImagePopup card={selectedCard} onClose={closePopups}></ImagePopup>
        <Footer />
      </div>
    </div>
  );
}
