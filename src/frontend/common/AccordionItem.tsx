// src/components/common/AccordionItem.tsx
import React from 'react';

interface AccordionItemProps {
    title: string;
    content: string;
    imageSrc: string;
    altText: string;
    isOpen: boolean;
    toggle: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, content, imageSrc, altText, isOpen, toggle }) => {
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
