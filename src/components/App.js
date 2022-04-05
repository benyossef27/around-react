import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import PopupWithImage from "./PopupWithImage";
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
        <PopupWithImage
          card={selectedCard}
          onClose={closePopups}
        ></PopupWithImage>
        <Footer />
        {/* <div className='popup popup_type_profile' id='popupprofile'>
          <div className='popup__container'>
            <button
              className='popup__close popup__close_type_profile'
              aria-label='popuoclose'
              type='button'
            ></button>
            <h2 className='popup__heading'>Edit Profile</h2>
            <form
              className='popup__form popup__form_type_profile'
              name='profileform'
            >
              <input
                id='name-input'
                name='name'
                type='text'
                placeholder='Name'
                className='popup__input popup__input_field_name'
                minLength='2'
                maxLength='40'
                required
              />
              <span id='name-input-error'></span>
              <input
                id='job-input'
                name='about'
                type='text'
                placeholder='About me'
                className='popup__input popup__input_field_job'
                minLength='2'
                maxLength='200'
                required
              />
              <span id='job-input-error'></span>
              <button
                type='submit'
                className='popup__button popup__button_disabled popup__button_type_profile'
              >
                Save
              </button>
            </form>
          </div>
        </div>
        <div className='popup popup_type_avatar'>
          <div className='popup__container'>
            <button
              className='popup__close popup__close_type_avatar'
              aria-label='popuoclose'
              type='button'
            ></button>
            <h2 className='popup__heading popup__heading_type_avatar'>
              Changeprofile picture
            </h2>
            <form
              className='popup__form popup__form_type_avatar'
              name='avatarform'
            >
              <input
                id='avatar-img-input'
                name='avatarImage'
                type='url'
                placeholder='Image Url'
                className='popup__input popup__input_field_img'
                required
              />
              <span id='avatar-img-input-error'></span>
              <button
                type='submit'
                className='popup__button popup__button_disabled popup__button_type_avatar'
              >
                Save
              </button>
            </form>
          </div>
        </div>
        <div className='popup popup_type_place' id='popupplace'>
          <div className='popup__container'>
            <button
              className='popup__close popup__close_type_place'
              aria-label='popuoclose'
              type='button'
            ></button>
            <h2 className='popup__heading popup__heading_type_place'>
              Add place
            </h2>
            <form
              className='popup__form popup__form_type_place'
              name='placeform'
            >
              <input
                id='place-title-input'
                name='placeHeading'
                type='text'
                placeholder='Title'
                className='popup__input popup__input_field_heading'
                minLength='1'
                maxLength='30'
                required
              />
              <span id='place-title-input-error'></span>
              <input
                id='place-img-input'
                name='placeImage'
                type='url'
                placeholder='Image Url'
                className='popup__input popup__input_field_img'
                required
              />
              <span id='place-img-input-error'></span>
              <button
                type='submit'
                className='popup__button popup__button_disabled popup__button_type_place'
              >
                Create
              </button>
            </form>
          </div>
        </div>
        <div className='popup popup_type_preview' id='popuppreview'>
          <div className='popup__container popup__container_type_preview'>
            <button
              type='button'
              className='popup__close popup__close_type_preview'
            ></button>
            <img
              className='popup__image popup__image_type_preview'
              src=' '
              alt=' '
            />
            <h2 className='popup__heading popup__heading_type_preview'></h2>
          </div>
        </div>
        <div className='popup popup_type_delete'>
          <div className='popup__container popup__container_type_delete'>
            <button
              type='button'
              className='popup__close popup__close_type_delete'
            ></button>
            <form className='popup__form popup__form_type_delete'>
              <h2 className='popup__heading popup__heading_type_delete'>
                Are you Sure?
              </h2>
              <button
                type='submit'
                className='popup__button popup__button_type_delete'
              >
                Yes
              </button>
            </form>
          </div>
        </div>

        <template className='card-template' id='card-template'>
          <div className='card'>
            <img className='card__image' />
            <button
              className='card__delete-button'
              type='button'
              aria-label='delete'
            ></button>
            <div className='card__box'>
              <h2 className='card__name'></h2>
              <div className='card__like-box'>
                <button
                  aria-label='like'
                  className='card__like-button'
                  type='submit'
                ></button>
                <p className='card__like-counter'></p>
              </div>
            </div>
          </div>
        </template> */}
      </div>
    </div>
  );
}
