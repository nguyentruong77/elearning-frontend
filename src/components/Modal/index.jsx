import { createPortal } from "react-dom"


export const Modal = ({ maskeCloseable, visibile, onCancel, children }) => {
    const onMaskeClick = () => {
        if (maskeCloseable) onCancel?.()
    }
    if (!visibile) return null
    return createPortal(
        <div className="popup-video" id="popup-video" onClick={onMaskeClick} >
            <div className="wrap">
                {children}
            </div>
            <div className="close" onClick={onCancel} />
        </div>,
        document.body
    )
}
