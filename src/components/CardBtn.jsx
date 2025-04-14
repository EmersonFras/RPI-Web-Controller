

function CardBtn(props) {
    const { form, type, disabled, className, style, onClick, content } = props

    return (
        <button form={form} type={type} disabled={disabled} style={style} className={`card__btn ${className}`} onClick={onClick}>{content}</button>
    )
}

export default CardBtn