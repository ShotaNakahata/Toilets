// vite-project/src/components/MapSearchToile.jsx
import { useState } from "react";
import { Link } from 'react-router-dom';
import Map from './Map';


function MapSearchToile() {
    const [loading, setLoading] = useState(true); // ローディング状態を管理

    const handleMapLoad = () => {
        setLoading(false); // 地図の読み込み完了時にローディングを解除
    };

    return (
        <div className="container-SearchToile">
            <div className="SearchToile-wrapper">
                <h1>SearchToile</h1>
                <h2>Map Search Mode</h2>
                <Link to="/FilterSearchToile" className="ChangeSearchMode-button">Filtered Search Mode</Link>
                <Link to="/" className="home-button">Return to Home</Link>
                {loading && <div className="loading">Loading...</div>} {/* ローディングインジケータを表示 */}
                <div className="Mapuse">
                    <Map onLoad={handleMapLoad} /> {/* 地図の読み込み完了時にhandleMapLoadを呼び出す */}
                </div>
            </div>
        </div>
    );
}

export default MapSearchToile;






