import React from 'react';
import MapAPI from './MapAPI'; // MapAPI コンポーネントをインポート

class Map extends React.Component {
    render() {
        return (
            <div className="Map-wrapper">
                <div className="container">
                    <h2>Map</h2>
                    <MapAPI /> {/* MapAPI コンポーネントをレンダリング */}
                </div>
            </div>
        );
    }
}

export default Map;
