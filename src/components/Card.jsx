

function Card(props) {
    const { titleContent, content, footerContent } = props
    
    return (
        <div className="card">
            {titleContent && 
                <div className="card__title">
                    {titleContent}
                </div>
            }

            <div className="card__body">
                {content}
            </div>

            <div className="card__footer">
                {footerContent}
            </div>
        </div>
    )
}

export default Card