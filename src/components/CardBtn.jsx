

function CardBtn(props) {
    const { disabled, className, style, onClick, content } = props

    return (
        <button disabled={disabled} style={style} className={`card__btn ${className}`} onClick={onClick}>{content}</button>
    )
}

export default CardBtn