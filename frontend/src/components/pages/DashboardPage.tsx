// import React, { useEffect, useState } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
// import Dashboard from "../../features/Chart/Dashboard";
// import CountryToiletChart from "../common/CountryToiletChart";
// import RatingPieChart from '../../features/Chart/RatingPieChart';
// import CountryRatingPieChart from '../../features/Chart/CountryRatingPieChart';
// import axios from "axios";

// interface RatingSummaryData {
//     _id: number;
//     count: number;
// }

// const DashboardPage: React.FC = () => {
//     const [ratingData, setRatingData] = useState<RatingSummaryData[]>([]);

//     // 環境変数からAPIのURLを取得
//     const apiUrl = import.meta.env.VITE_API_URL;
//     // const apiUrl = 'http://localhost:4000/api';

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 // API URLを環境変数から取得して使用
//                 const response = await axios.get(`${apiUrl}/toilets/ratings-summary`);
//                 setRatingData(response.data);
//             } catch (error) {
//                 console.error("Error fetching ratings summary", error);
//             }
//         };
//         fetchData();
//     }, [apiUrl]);

//     return (
//         <div id="dashboard" className="flex flex-col min-h-screen max-h-screen  relative">
//             <div className='container text-white mt-10  '>
//                 <h1 className="text-6xl font-bold mb-6 text-center">Dashboard</h1>

//                 {/* 上段: 全体の統計情報カード */}
//                 <div className="flex flex-wrap gap-4 border-2 border-white justify-center items-center shadow-white h-1/6">
//                     <Card className="w-full max-w-xs flex-grow h-full">
//                         <CardHeader>
//                             <CardTitle className="text-lg">Total Users</CardTitle>
//                         </CardHeader>
//                         <CardContent className="h-full flex justify-center items-center">
//                             <Dashboard countType="user" />
//                         </CardContent>
//                     </Card>
//                     <Card className="w-full max-w-xs flex-grow h-full">
//                         <CardHeader>
//                             <CardTitle className="text-lg">Total Toilets</CardTitle>
//                         </CardHeader>
//                         <CardContent className="h-full flex justify-center items-center">
//                             <Dashboard countType="toilet" />
//                         </CardContent>
//                     </Card>
//                     <Card className="w-full max-w-xs flex-grow h-full">
//                         <CardHeader>
//                             <CardTitle className="text-lg">Accessible Toilets</CardTitle>
//                         </CardHeader>
//                         <CardContent className="h-full flex justify-center items-center">
//                             <Dashboard countType="universalToilet" />
//                         </CardContent>
//                     </Card>
//                 </div>

//                 {/* メインコンテナ: 国別トイレ情報と評価の円グラフ */}
//                 <div className="flex gap-4 mt-5 max-h-full relative">
//                     <div className='flex flex-col'>

//                     {/* Country-wise Toilet Summary コンテナ */}
//                     <div className=" w-full border-2 border-white p-4 h-full buttom">
//                         <h2 className="text-2xl font-bold  text-center">Country-wise Toilet Summary</h2>
//                         <div className="h-full flex items-center justify-center">
//                             <CountryToiletChart />
//                         </div>
//                     </div>
//                     <div className=' border-2 border-white h-full '></div>
//                     </div>

//                     {/* 4つの PieChart を囲むコンテナ */}
//                     {/*w-1/2 grid grid-cols-2 */}
//                     <div className="grid grid-cols-2  gap-4 w-full">
//                         <div className='border-2 border-white flex justify-center items-center '>
//                             <RatingPieChart data={ratingData} />
//                         </div>
//                         <div className='border-2 border-white flex justify-center items-center '>
//                             <CountryRatingPieChart country="Japan" />
//                         </div>
//                         <div className='border-2 border-white flex justify-center items-center'>
//                             <CountryRatingPieChart country="Taiwan" />
//                         </div>
//                         <div className='border-2 border-white flex justify-center items-center '>
//                             <CountryRatingPieChart country="United States" />
//                         </div>
//                     </div>
//                 </div>

//                 <div className="mt-8 flex-grow">
//                     {/* 他のコンテンツ */}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default DashboardPage;

///レスポンシブ前
// import React, { useEffect, useState, useRef } from 'react';
// import { Card, CardContent } from '../ui/card';
// import Dashboard from "../../features/Chart/Dashboard";
// import CountryToiletChart from "../common/CountryToiletChart";
// import RatingPieChart from '../../features/Chart/RatingPieChart';
// import CountryRatingPieChart from '../../features/Chart/CountryRatingPieChart';
// import axios from "axios";

// interface RatingSummaryData {
//     _id: number;
//     count: number;
// }

// const DashboardPage: React.FC = () => {
//     const [ratingData, setRatingData] = useState<RatingSummaryData[]>([]);
//     const chartContainerRef = useRef<HTMLDivElement>(null);
//     const [chartSize, setChartSize] = useState<{ width: number, height: number }>({ width: 400, height: 400 });

//     // APIからデータを取得
//     const apiUrl = import.meta.env.VITE_API_URL;

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axios.get(`${apiUrl}/toilets/ratings-summary`);
//                 setRatingData(response.data);
//             } catch (error) {
//                 console.error("Error fetching ratings summary", error);
//             }
//         };
//         fetchData();
//     }, [apiUrl]);

//     // 親要素のサイズに基づいてチャートサイズを調整
//     useEffect(() => {
//         const updateChartSize = () => {
//             if (chartContainerRef.current) {
//                 const containerWidth = chartContainerRef.current.offsetWidth;
//                 const containerHeight = chartContainerRef.current.offsetHeight;
//                 setChartSize({
//                     width: Math.min(containerWidth * 0.8, 400),
//                     height: Math.min(containerHeight * 0.8, 400),
//                 });
//             }
//         };

//         // 初期サイズ設定
//         updateChartSize();

//         // ウィンドウリサイズ時にサイズを更新
//         window.addEventListener('resize', updateChartSize);
//         return () => window.removeEventListener('resize', updateChartSize);
//     }, []);

//     return (
//         <div id="dashboard" className="flex flex-col h-screen w-screen max-w-screen-xl mx-auto p-4 pt-20 pb-20 text-white">
//             {/* ダッシュボードのタイトル */}
//             <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center">Dashboard</h1>

//             {/* 統計情報のカード：横並びで3つ */}
//             <div className="flex flex-wrap gap-4 justify-center items-center h-1/4 ">
//                 <Card className="w-full max-w-xs flex-grow h-full">
//                     <CardContent className="h-full flex justify-center items-center pt-5">
//                         <Dashboard countType="user" />
//                     </CardContent>
//                 </Card>
//                 <Card className="w-full max-w-xs flex-grow h-full">
//                     <CardContent className="h-full flex justify-center items-center pt-5">
//                         <Dashboard countType="toilet" />
//                     </CardContent>
//                 </Card>
//                 <Card className="w-full max-w-xs flex-grow h-full">
//                     <CardContent className="h-full flex justify-center items-center pt-5">
//                         <Dashboard countType="universalToilet" />
//                     </CardContent>
//                 </Card>
//             </div>

//             {/* 国別トイレ情報と円グラフ */}
//             <div ref={chartContainerRef} className="flex flex-grow gap-4 mt-8">
//                 {/* 左側：国別トイレチャート */}
//                 <div className="w-full md:w-1/2 h-full border-2 border-white p-4">
//                     <h2 className="text-2xl font-bold text-center">Country-wise Toilet Summary</h2>
//                     <div className="h-full flex items-center justify-center">
//                         <CountryToiletChart />
//                     </div>
//                 </div>

//                 {/* 右側：評価の円グラフ群 */}
//                 <div className="w-full md:w-1/2 h-full grid grid-cols-2 gap-4">
//                     <div className="border-2 border-white flex justify-center items-center">
//                         <RatingPieChart data={ratingData} />
//                     </div>
//                     <div className="border-2 border-white flex justify-center items-center">
//                         <CountryRatingPieChart country="Japan" />
//                     </div>
//                     <div className="border-2 border-white flex justify-center items-center">
//                         <CountryRatingPieChart country="Taiwan" />
//                     </div>
//                     <div className="border-2 border-white flex justify-center items-center">
//                         <CountryRatingPieChart country="United States" />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default DashboardPage;


// レスポンシブ後
import React, { useEffect, useState, useRef } from 'react';
import { Card, CardContent } from '../ui/card';
import Dashboard from "../../features/Chart/Dashboard";
import CountryToiletChart from "../common/CountryToiletChart";
import RatingPieChart from '../../features/Chart/RatingPieChart';
import CountryRatingPieChart from '../../features/Chart/CountryRatingPieChart';
import axios from "axios";

interface RatingSummaryData {
    _id: number;
    count: number;
}

const DashboardPage: React.FC = () => {
    const [ratingData, setRatingData] = useState<RatingSummaryData[]>([]);
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const [chartSize, setChartSize] = useState<{ width: number, height: number }>({ width: 300, height: 300 });

    // APIからデータを取得
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/toilets/ratings-summary`);
                setRatingData(response.data);
            } catch (error) {
                console.error("Error fetching ratings summary", error);
            }
        };
        fetchData();
    }, [apiUrl]);

    // 親要素のサイズに基づいてチャートサイズを調整
    useEffect(() => {
        const updateChartSize = () => {
            if (chartContainerRef.current) {
                const containerWidth = chartContainerRef.current.offsetWidth;
                const containerHeight = chartContainerRef.current.offsetHeight;
                setChartSize({
                    width: Math.min(containerWidth * 0.6, 300),
                    height: Math.min(containerHeight * 0.6, 300),
                });
            }
        };

        // 初期サイズ設定
        updateChartSize();

        // ウィンドウリサイズ時にサイズを更新
        window.addEventListener('resize', updateChartSize);
        return () => window.removeEventListener('resize', updateChartSize);
    }, []);

    return (
        <div>
            <div id="dashboard" className=" flex flex-col h-min-screen w-screen max-w-screen-xl mx-auto p-4 pt-10 pb-10 text-white">
                {/* ダッシュボードのタイトル */}
                <h1 className="text-3xl sm:text-5xl font-semibold mb-6 text-center">Dashboard</h1>

                {/* 統計情報のカード：モバイル用（縦並び）、パソコン用（横並び） */}
                <div className="flex flex-row justify-center items-stretch gap-4 sm:h-1/4 w-full">
                    {/* User Count */}
                    <Card className="max-w-[30%] sm:max-w-xs flex-grow flex flex-col justify-center items-center">
                        <CardContent className="h-full flex justify-center items-center pt-3">
                            <Dashboard countType="user" />
                        </CardContent>
                    </Card>

                    {/* Toilet Count */}
                    <Card className="max-w-[30%] sm:max-w-xs flex-grow flex flex-col justify-center items-center">
                        <CardContent className="h-full flex justify-center items-center pt-3">
                            <Dashboard countType="toilet" />
                        </CardContent>
                    </Card>

                    {/* Accessible Toilets Count */}
                    <Card className="max-w-[30%] sm:max-w-xs flex-grow flex flex-col justify-center items-center">
                        <CardContent className="h-full flex justify-center items-center pt-3">
                            <Dashboard countType="universalToilet" />
                        </CardContent>
                    </Card>
                </div>




                {/* 国別トイレ情報と円グラフ：モバイル用（縦並び）、パソコン用（左右に分割） */}
                <div ref={chartContainerRef} className="flex flex-col sm:flex-row flex-grow gap-4 mt-6">
                    {/* 左側：国別トイレチャート */}
                    <div className="w-full sm:w-1/2 h-full border-2 border-white p-2  sm:p-4 md:p-6 lg:p-8">
                        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-center">Country-wise Toilet Summary</h2>
                        <div className="h-full flex items-center justify-center">
                            <div className="w-full h-auto p-4 sm:p-6 md:p-8 lg:p-10">
                                <CountryToiletChart />
                            </div>
                        </div>
                    </div>


                    {/* 右側：評価の円グラフ群 */}
                    <div className="w-full grid grid-cols-2 sm:grid-cols-2 gap-4">
                        {/* 1つ目のグラフ */}
                        <div className="border-2 border-white flex justify-center items-center w-full h-auto">
                            <div className="w-full h-auto aspect-w-1 aspect-h-1">
                                <div style={{ width: '100%', height: '100%' }}>
                                    <RatingPieChart data={ratingData} />
                                </div>
                            </div>
                        </div>

                        {/* 2つ目のグラフ */}
                        <div className="border-2 border-white flex justify-center items-center w-full h-auto">
                            <div className="w-full h-auto aspect-w-1 aspect-h-1">
                                <div style={{ width: '100%', height: '100%' }}>
                                    <CountryRatingPieChart country="Japan" />
                                </div>
                            </div>
                        </div>

                        {/* 3つ目のグラフ */}
                        <div className="border-2 border-white flex justify-center items-center w-full h-auto">
                            <div className="w-full h-auto aspect-w-1 aspect-h-1">
                                <div style={{ width: '100%', height: '100%' }}>
                                    <CountryRatingPieChart country="Taiwan" />
                                </div>
                            </div>
                        </div>

                        {/* 4つ目のグラフ */}
                        <div className="border-2 border-white flex justify-center items-center w-full h-auto">
                            <div className="w-full h-auto aspect-w-1 aspect-h-1">
                                <div style={{ width: '100%', height: '100%' }}>
                                    <CountryRatingPieChart country="United States" />
                                </div>
                            </div>
                        </div>
                    </div>





                </div>
            </div>
        </div>
    );
};

export default DashboardPage;

