import React, { useState } from 'react';
import AccordionItem from '../common/AccordionItem';

interface Service {
    title: string;
    content: string;
    imageSrc: string;
    altText: string;
}

const Service: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);  // 共通の開閉状態を管理
    const toggleItems = () => {
        setIsOpen(!isOpen);  // すべてのアイテムの表示状態をトグル
    };

    const services: Service[] = [
        // サービスデータの配列
        { title: "Search", content: "You can use your current location to find the nearest available toilet on the map. This way, you're always prepared in case of an emergency!", imageSrc: "/images/IntroSearch.jpg", altText: "Search" },
        { title: "Share", content: "Register the available toilet you have found on the site! By registering, you help not only yourself for future visits but also others in search of a toilet. The toilet you find could be a lifesaver for someone else", imageSrc: "/images/IntroShare.jpg", altText: "Share" },
        { title: "Rate", content: "Want to use a clean and well-equipped toilet? Then check the ratings! And don't forget to rate the toilets yourself. Where's the best toilet? Let's find out", imageSrc: "/images/IntroRate.jpg", altText: "Rate" },
        { title: "BookMark", content: "Do not lose track of your favorite toilets. Always ensure the utmost comfort by using your most liked restrooms. Don't forget to bookmark them!", imageSrc: "/images/IntroBookMark.jpg", altText: "BookMark" },

        // 他のサービスも同様に追加
    ];

    return (
        <div className="service-wrapper">
            <div className="container">
                <h2>Service</h2>
                <div className="Servicecontents">
                    {services.map((service, index) => (
                        <AccordionItem
                            key={index}
                            title={service.title}
                            content={service.content}
                            imageSrc={service.imageSrc}
                            altText={service.altText}
                            isOpen={isOpen}  // 共通の開閉状態を渡す
                            toggle={toggleItems}  // トグル関数を渡す
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Service;
