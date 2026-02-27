import { useEffect } from "react";
import { createPortal } from "react-dom";
import "./Modal.css";

/**
 * A portal-based Modal component that renders children over an overlay.
 * Handles body scroll locking when active.
 * @param {React.ReactNode} children - Content to be displayed inside the modal.
 * @param {boolean} isOpen - Controls the visibility of the modal.
 * @param {Function} onClose - Callback function to trigger when clicking the overlay.
 * @returns {JSX.Element|null} The rendered Modal portal or null if closed.
 */
const Modal = ({ children, isOpen, onClose }) => {
    /**
     * @name bodyScrollEffect
     * @description Effect hook that toggles the body's overflow style to prevent background scrolling.
     * @inner
     */
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return createPortal(
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>,
        document.body,
    );
};

export default Modal;
