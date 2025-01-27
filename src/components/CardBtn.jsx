import '../styles/card-button.css'

function CardBtn(props) {
    const { open, content } = props

    return (
        <button className="open-btn" onClick={() => open(true)}>{content}</button>
    )
}

export default CardBtn