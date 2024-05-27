
const AccordionItem = ({ title, content, imageSrc, altText, isOpen, toggle }) => {
    return (
        <div className="ServiceContentSearch">
            <button className="ServiceName" onClick={toggle}>
                <img className="ServiceContentImg" src={imageSrc} alt={altText} />
                {title}
            </button>
            <button className="View-Details-button" onClick={toggle}>
            <h3>View Details</h3>
            </button>
            {isOpen && (
                <div className="ServiceDetail">
                    {content}
                </div>
            )}
        </div>
    );
};

export default AccordionItem;
