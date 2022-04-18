export default function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_type_${props.name} ${
        props.isOpen ? "popup_opened" : ""
      }`}
    >
      <div className="popup__container">
        <button
          className="popup__close"
          aria-label="popupclose"
          type="button"
          onClick={props.onClose}
        ></button>
        <h2 className="popup__heading">{props.title}</h2>
        <form
          onSubmit={props.onSubmit}
          className={`popup__form popup__form_type_${props.name}`}
          name={`${props.name}form`}
        >
          {props.children}
          <button type="submit" className="popup__button">
            {`${props.buttonText}`}
          </button>
        </form>
      </div>
    </div>
  );
}
