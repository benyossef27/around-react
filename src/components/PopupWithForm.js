export default function PopupWithForm({
  name,
  isOpen,
  onClose,
  title,
  submitButton,
  children,
}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          className="popup__close"
          aria-label="popupclose"
          type="button"
          onClick={onClose}
        ></button>
        <h2 className="popup__heading">{title}</h2>
        <form
          className={`popup__form popup__form_type_${name}`}
          name={`${name}form`}
        >
          {children}
          <button type="submit" className="popup__button">
            {submitButton}
          </button>
        </form>
      </div>
    </div>
  );
}
