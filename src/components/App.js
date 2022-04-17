import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { useEffect, useState } from "react";
import { api } from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";

export default function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAvatarPopupOpen, setIsAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState("");

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
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
  function handleUpdateUser({ name, about }) {
    api
      .setUserInfo({ name, about })
      .then((info) => {
        setCurrentUser(info);
        setIsEditProfilePopupOpen(false);
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  }
  function handleUpdateAvatar({ avatar }) {
    api
      .setUserAvatar(avatar)
      .then((info) => {
        setCurrentUser(info);
        setIsAvatarPopupOpen(false);
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  }
  function closePopups() {
    setIsEditProfilePopupOpen(false);
    setIsAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeletePopupOpen(false);
    setSelectedCard(null);
  }
  useEffect(() => {
    api
      .getUserInfo()
      .then((userData) => setCurrentUser(userData))
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  }, []);

  return (
    <div className="page">
      <div className="root">
        <CurrentUserContext.Provider value={currentUser}>
          <Header />
          <Main
            onEditProfileClick={handleEditProfileClick}
            onEditAvatarClick={handleAvatarClick}
            onAddPlaceClick={handleAddPlaceClick}
            onDeleteClick={handleDeleteClick}
            onCardClick={handleCardClick}
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closePopups}
            onUpdateUser={handleUpdateUser}
          />
          <EditAvatarPopup
            isOpen={isAvatarPopupOpen}
            onClose={closePopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
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
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}
