

function Card(props) {
    const { titleContent, content, footerContent } = props
    
    return (
        <div className="card">
            {titleContent && 
                <div className="title">
                    {titleContent}
                </div>
            }

            <div className="body">
                {content}
            </div>

            <div className="footer">
                {footerContent}
            </div>
        </div>
    )
}

export default Card