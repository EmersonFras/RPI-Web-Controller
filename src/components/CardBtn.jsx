import '../styles/card-button.css'

function CardBtn(props) {
    const { onClick, content } = props

    return (
        <button className="card-btn" onClick={onClick}>{content}</button>
    )
}

export default CardBtn