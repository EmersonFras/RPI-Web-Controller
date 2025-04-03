

function CardBtn(props) {
    const { onClick, content } = props

    return (
        <button className="card__btn" onClick={onClick}>{content}</button>
    )
}

export default CardBtn