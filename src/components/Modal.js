import { createPortal } from "react-dom"
import './Modal.css'

const Modal = ({ isOpen, onClose, children }) => {

    if (!isOpen) return null

    return createPortal(
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>,
        document.getElementById('modal-root')
    )
}

export default Modal