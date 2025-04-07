

function CardBtn(props) {
    const { className, style, onClick, content } = props

    return (
        <button style={style} className={`card__btn ${className}`} onClick={onClick}>{content}</button>
    )
}

export default CardBtn