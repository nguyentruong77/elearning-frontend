import { createPortal } from 'react-dom'

export default function VideoModal({ maskeCloseable, visibile, onCancel }) {
    const onMaskeClick = () => {
        if (maskeCloseable) onCancel?.()
    }
    if (!visibile) return null
    return createPortal(
        <div className="popup-video" id="popup-video" onClick={onMaskeClick} >
            <div className="wrap">
                <iframe width="800px" height="450px" src="https://www.youtube.com/embed/OyRmce1F7-8?si=nh9RafnzGvuE27oH" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </div>
            <div className="close" onClick={onCancel} />
        </div>,
        document.body
    )
}
