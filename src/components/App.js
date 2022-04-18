import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { useEffect, useState } from "react";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

export default function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAvatarPopupOpen, setIsAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

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
        closeAllPopups();
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
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  }
  function handleAddPlaceSubmit(info) {
    api
      .createCard(info)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  }
  function closeAllPopups() {
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

  useEffect(() => {
    api
      .getInitialCards()
      .then((Data) => {
        setCards((cards) => [...cards, ...Data]);
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((user) => user._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard
          )
        );
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  }
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards(cards.filter((deleted) => deleted._id !== card._id));
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  }
  return (
    <div className="page">
      <div className="root">
        <CurrentUserContext.Provider value={currentUser}>
          <Header />
          <Main
            cards={cards}
            onCardLike={handleCardLike}
            onEditProfileClick={handleEditProfileClick}
            onEditAvatarClick={handleAvatarClick}
            onAddPlaceClick={handleAddPlaceClick}
            onCardDelete={handleCardDelete}
            onCardClick={handleCardClick}
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <EditAvatarPopup
            isOpen={isAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlaceSubmit={handleAddPlaceSubmit}
          />
          <PopupWithForm
            name="preview"
            title="Are you sure?"
            submitButton="Yes"
            isOpen={isDeletePopupOpen}
            onClose={closeAllPopups}
          ></PopupWithForm>
          <ImagePopup card={selectedCard} onClose={closeAllPopups}></ImagePopup>
          <Footer />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}
