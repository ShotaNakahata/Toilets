import React, { useState, useRef } from "react";
import toiletsData from '../data/toiletsData';

function FilterSearchToile() {
    // トイレリストの状態として初期データを設定
    const [toiletList, setToiletList] = useState(toiletsData); 
    const ref = useRef(null);
    // フィルタリングオプションの状態
    const [isTopRated, setIsTopRated] = useState(false);
    const [showAccessible, setShowAccessible] = useState(false);

    // 検索機能：ユーザーが入力した値に基づきフィルタリングを行う
    const handleSearch = () => {
        const searchValue = ref.current.value.toLowerCase();
        applyFilters(searchValue, isTopRated, showAccessible);
    };

    // 評価に基づくフィルタリングをトグルする
    const toggleRatingFilter = () => {
        setIsTopRated(!isTopRated);
        applyFilters(ref.current.value, !isTopRated, showAccessible);
    };

    // アクセシブルフィルタリングをトグルする
    const toggleAccessibleFilter = () => {
        setShowAccessible(!showAccessible);
        applyFilters(ref.current.value, isTopRated, !showAccessible);
    };

    // 与えられた条件に基づきトイレリストを更新
    const applyFilters = (searchTerm, topRated, accessibleOnly) => {
        let filtered = toiletsData.filter(toilet =>
            toilet.name.toLowerCase().includes(searchTerm) ||
            toilet.address.toLowerCase().includes(searchTerm)
        );

        // 評価が高いトップ5をフィルタリング
        if (topRated) {
            filtered = filtered.sort((a, b) => b.rating - a.rating).slice(0, 5);
        }

        // アクセシブルなトイレのみをフィルタリング
        if (accessibleOnly) {
            filtered = filtered.filter(toilet => toilet.accessible);
        }

        setToiletList(filtered); // 更新されたリストを状態に設定
    };

    return (
        <div className="container-SearchToile">
            <div className="SearchToile-wrapper">
                <h1>SearchToile</h1>
                <h2>Filter Search Mode</h2>
                {/* トグルスイッチとして動作するボタン */}
                <button onClick={toggleRatingFilter}>{isTopRated ? "Show All" : "Top 5 By Rating"}</button>
                <button onClick={toggleAccessibleFilter}>{showAccessible ? "Show All" : "Only Accessible"}</button>
                <input type="text" ref={ref} onChange={handleSearch} />
                <div className='SearchToile-shows'>
                    {toiletList.map((toilet) => (
                        <div className="box" key={toilet.id}>
                            <h3>{toilet.name}</h3>
                            <p>{toilet.address}</p>
                            <p>Rating: {toilet.rating}</p>
                            <p>{toilet.comment}</p>
                            <p>Accessible: {toilet.accessible ? "Yes" : "No"}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default FilterSearchToile;

