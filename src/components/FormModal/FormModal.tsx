import React, { JSX } from "react";
import ReactDOM from "react-dom";
import { FocusTrap } from "focus-trap-react";
import "./FormModal.css";

interface FormModalProps {
  title: string | JSX.Element;
  children: React.ReactNode;
  onClose: () => void;
  variant?: "primary" | "secondary";
}

const FormModal: React.FC<FormModalProps> = ({ title, children, onClose, variant = "primary" }) => {
  return ReactDOM.createPortal(
    <div className={`modal-overlay ${variant}`}>
      <FocusTrap>
        <div className={`modal ${variant}`}>
          <div>
            <button
              className={`modal-close-button ${variant}`}
              onClick={onClose}
              aria-label="Close Modal"
            >
              X
            </button>
            <br />
          </div>
          <div className={`modal-header ${variant}`}>
            <div className={`modal-title ${variant}`}>
              {title}
            </div>
          </div>
          <div className={`modal-body ${variant}`}>{children}</div>
        </div>
      </FocusTrap>
    </div>,
    document.body
  );
};

export default FormModal;