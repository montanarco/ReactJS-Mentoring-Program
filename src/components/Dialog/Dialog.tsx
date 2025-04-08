import React, { JSX } from "react";
import ReactDOM from "react-dom";
import { FocusTrap } from "focus-trap-react";
import "./Dialog.css";

interface DialogProps {
    title: string | JSX.Element;
    children: React.ReactNode;
    onClose: () => void;
    variant?: "primary" | "secondary";
}

class Dialog extends React.Component<DialogProps> {
    render() {
        const { title, children, onClose, variant = "primary" } = this.props;

        return ReactDOM.createPortal(
            <div className={`dialog-overlay ${variant}`}>
                <FocusTrap>
                    <div className={`dialog ${variant}`}>
                        <div>
                            <button
                                className={`dialog-close-button ${variant}`}
                                onClick={() => onClose()}
                                aria-label="Close dialog"
                            >
                                X
                            </button>
                            <br />
                        </div>
                        <div className={`dialog-icon ${variant}`}>
                            <i className={`material-icons red-checkmark ${variant}`}>check_circle</i>
                        </div>
                        <div className={`dialog-header ${variant}`}>
                            <div className={`dialog-title ${variant}`}>{title}</div>

                        </div>
                        <div className={`dialog-body ${variant}`}>{children}</div>
                    </div>
                </FocusTrap>
            </div>,
            document.body
        );
    }
}

export default Dialog;