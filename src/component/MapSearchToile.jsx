import  { useRef, useState } from "react";
import { Link } from 'react-router-dom';
import toiletsData from '../data/toiletsData';

function MapSearchToile() {
    const [toiletList, setToiletList] = useState(toiletsData); 
    const ref = useRef(null);

    // 検索機能
    const handleSearch = () => {
        const searchValue = ref.current.value.toLowerCase(); // 入力値を小文字に変換
        // name または address に searchValue が含まれているかどうかでフィルタリング
        const filteredToilets = toiletsData.filter((toilet) =>
            toilet.name.toLowerCase().includes(searchValue) || 
            toilet.address.toLowerCase().includes(searchValue)
        );
        setToiletList(filteredToilets); // フィルタリング結果で状態を更新
    };
    

    return (
        <div className="container-SearchToile">
            <div className="SearchToile-wrapper">
                <h1>SearchToile</h1>
                <h2>Map Search Mode</h2>
                <Link to="/filtered-search">Filtered Search Mode</Link> 
                <Link to="/" className="home-button">Return to Home</Link>
                <input type="text" ref={ref} onChange={handleSearch} /> 
                <div className='SearchToile-shows'>
                    {toiletList.map((toilet) => (
                        <div className="box" key={toilet.id}>
                            <h3>{toilet.name}</h3>
                            <p>{toilet.address}</p>
                            <p>Rating: {toilet.rating}</p>
                            <p>{toilet.comment}</p>
                            <p>{toilet.accessible}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MapSearchToile;





