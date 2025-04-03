import { useEffect } from 'react'


function Modal(props) {
    const {open, cancelFn, primaryFn, secondaryFn, closeIcon, titleContent, content} = props

    // capture ESC key to close the modal 
    useEffect(() => {
        const handleKeyDown = (e) => {
        if (e.key === 'Escape' && open) {
            if (cancelFn) {
                cancelFn()
            }
        }
    }
        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [open, cancelFn])

    if (!open) return null

    return (
        <div className="modal">
            <div className="modal__container">
                {titleContent && (<div className="modal__title">
                        {titleContent}
                        <div className="modal__close">
                            <button onClick={cancelFn}>{closeIcon ?? 'X'}</button>
                        </div>
                    </div>
                )}

                <div className="modal__body">
                    {content}
                </div>

                <div className="modal__footer">
                    {secondaryFn && (
                        <button onClick={secondaryFn} className="modal__button modal__button--cancel">
                            Cancel
                        </button>
                    )}
                    {primaryFn && (
                        <button onClick={primaryFn} className='modal__button modal__button--submit'>Submit</button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Modal