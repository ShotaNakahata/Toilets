import React from 'react';

class MapAPI extends React.Component {
    componentDidMount() {
        // マップの初期化関数
        const initMap = () => {
            const options = {
                zoom: 8,
                center: { lat: 35.6895, lng: 139.6917 }, // こここ音後変更する必要あり（現在東京）
            };
            // マップを表示
            new window.google.maps.Map(document.getElementById('map'), options);
        };

        // Google Maps JavaScript API のスクリプトを動的に追加
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyC7RC-zjoKH6t747hf6PKsgt779F5LpXlY&callback=initMap`;
        script.async = true;
        script.defer = true;
        window.initMap = initMap; // グローバルスコープに initMap 関数をセット
        document.head.appendChild(script);
    }

    render() {
        return (
            <div>
                <div id="map" style={{ height: '400px', width: '100%' }}></div>
            </div>
        );
    }
}

export default MapAPI;
