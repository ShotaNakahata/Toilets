import React from 'react';
import AccordionItem from './AccordionItem'; // AccordionItem コンポーネントをインポート

// Service コンポーネントの定義
const Service = () => {
    // サービスのデータを配列で定義
    const services = [
        {
            title: "Search", // タイトル
            content: "You can use your current location to find the nearest available toilet on the map. This way, you're always prepared in case of an emergency!", // コンテンツ
            imageSrc: "/images/IntroSearch.jpg", // 画像のパス
            altText: "Search" // 画像の代替テキスト
        },
        {
            title: "Share", // タイトル
            content: "Register the available toilet you have found on the site! By registering, you help not only yourself for future visits but also others in search of a toilet. The toilet you find could be a lifesaver for someone else", // コンテンツ
            imageSrc: "/images/IntroShare.jpg", // 画像のパス
            altText: "Share" // 画像の代替テキスト
        },
        {
            title: "Rateh", // タイトル
            content: "Want to use a clean and well-equipped toilet? Then check the ratings! And don't forget to rate the toilets yourself. Where's the best toilet? Let's find out", // コンテンツ
            imageSrc: "/images/IntroRate.jpg", // 画像のパス
            altText: "Rate" // 画像の代替テキスト
        },
        {
            title: "BookMark", // タイトル
            content: "Don not lose track of your favorite toilets. Always ensure the utmost comfort by using your most liked restrooms. Don't forget to bookmark them!", // コンテンツ
            imageSrc: "/images/IntroBookMark.jpg", // 画像のパス
            altText: "BookMark" // 画像の代替テキスト
        },

        // 他のサービスデータを追加可能
    ];

    return (
        <div className="service-wrapper">
            <div className="container">
                <h2>Service</h2> {/* ヘッダー */}
                <div className="Servicecontents">
                    {/* services 配列の各要素に対して AccordionItem コンポーネントをマップ */}
                    {services.map((service, index) => (
                        <AccordionItem
                            key={index} // ユニークな key, Reactのリストレンダリングで必要
                            title={service.title}
                            content={service.content}
                            imageSrc={service.imageSrc}
                            altText={service.altText}
                        />
                    ))}
                </div>
                <h3>These features will enhance your toilet experience when you're out and about.</h3>
            </div>
        </div>
    );
};

export default Service;  // Service コンポーネントをエクスポート
