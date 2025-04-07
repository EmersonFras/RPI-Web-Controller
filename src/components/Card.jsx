

function Card(props) {
    const { className, titleContent, content, footerContent } = props
    
    return (
        <div className={`card ${className ? className : ''}`} >
            {titleContent && 
                <div className="card__title">
                    {titleContent}
                </div>
            }

            <div className="card__body">
                {content}
            </div>

            {footerContent && 
                <div className="card__footer">
                    {footerContent}
                </div>
            }
        </div>
    )
}

export default Card