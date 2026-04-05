import { createPortal } from "react-dom"

const Modal = ({ isOpen, onClose, children }) => {

    if (!isOpen) return null

    return createPortal(
        <div>
            {children}
        </div>,
        document.getElementById('modal-root')
    )
}

export default Modal