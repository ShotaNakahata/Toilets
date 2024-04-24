import React, { useState, useRef } from "react";
import toiletsData from '../data/toiletsData';

function FilterSearchToile() {
    const [toiletList, setToiletList] = useState(toiletsData); // トイレのリストを状態として保持
    const [showModal, setShowModal] = useState(false); // モーダル表示の状態
    const [isTopRated, setIsTopRated] = useState(false); // トップ評価されたトイレのみを表示するフィルタの状態
    const [showAccessible, setShowAccessible] = useState(false); // アクセシブルなトイレのみを表示するフィルタの状態
    const ref = useRef(null); // 検索バーへの参照

    // 検索機能：ユーザーが入力した値に基づいてフィルタリングを実行
    const handleSearch = () => {
        const searchValue = ref.current.value.toLowerCase();
        applyFilters(searchValue, isTopRated, showAccessible);
    };

    // モーダルウィンドウの表示を切り替える関数
    const toggleModal = () => {
        setShowModal(!showModal);
    };

    // 指定された条件に基づきトイレのリストをフィルタリングする関数
    const applyFilters = (searchTerm, topRated, accessibleOnly) => {
        let filtered = toiletsData.filter(toilet =>
            toilet.name.toLowerCase().includes(searchTerm) ||
            toilet.address.toLowerCase().includes(searchTerm)
        );

        // トップ評価のフィルタが有効な場合、評価が高い順にソートし、上位5件を選択
        if (topRated) {
            filtered = filtered.sort((a, b) => b.rating - a.rating).slice(0, 5);
        }

        // アクセシブルフィルタが有効な場合、アクセシブルなトイレのみを選択
        if (accessibleOnly) {
            filtered = filtered.filter(toilet => toilet.accessible);
        }

        setToiletList(filtered); // フィルタリング結果を状態にセット
    };

    // チェックボックスの状態変更でフィルタリングをトリガー
    const toggleRatingFilter = () => {
        const newTopRated = !isTopRated;
        setIsTopRated(newTopRated);
        applyFilters(ref.current.value, newTopRated, showAccessible);
    };

    const toggleAccessibleFilter = () => {
        const newShowAccessible = !showAccessible;
        setShowAccessible(newShowAccessible);
        applyFilters(ref.current.value, isTopRated, newShowAccessible);
    };

    return (
        <div className="container-SearchToile">
            <div className="SearchToile-wrapper">
                <h1>SearchToile</h1>
                <h2>Filter Search Mode</h2>
                <button onClick={toggleModal}>Filter Options</button>
                {showModal && (
                    <div className="modal">
                        <div className="modal-content">
                            <h4>Filter Options</h4>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={isTopRated}
                                    onChange={toggleRatingFilter}
                                />
                                Top 5 By Rating
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={showAccessible}
                                    onChange={toggleAccessibleFilter}
                                />
                                Only Accessible
                            </label>
                            <button onClick={toggleModal}>Close</button>
                        </div>
                    </div>
                )}
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
