import PopupWithForm from "./PopupWithForm";

export default function EditProfilePopup({ isOpen, onClose }) {
  return (
    <PopupWithForm
      name="edit"
      title="Edit profile"
      submitButton="save"
      isOpen={isOpen}
      onClose={onClose}
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
  );
}
