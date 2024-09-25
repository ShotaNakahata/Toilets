// frontend/src/components/pages/DashboardPage.tsx
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
                <div ref={chartContainerRef} className="flex flex-col sm:flex-row flex-grow gap-4 mt-6 h-full">
                    {/* 左側：国別トイレチャート */}
                    <div className="w-full sm:w-1/2 border-2 border-white p-2 sm:p-4 md:p-6 lg:p-8 flex-grow">
                        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-center">Country-wise Toilet Summary</h2>
                        <div className="w-full h-full p-4 sm:p-6 md:p-8 lg:p-10">
                            <CountryToiletChart />
                        </div>
                    </div>

                    {/* 右側：評価の円グラフ群 */}
                    <div className="w-full sm:w-1/2 grid grid-cols-2 sm:grid-cols-2 gap-4 h-full">
                        {/* 1つ目のグラフ */}
                        <div className="border-2 border-white flex justify-center items-center w-full h-auto">
                            <div className="w-full aspect-w-1 aspect-h-1">
                                <div style={{ width: '100%', height: '100%' }}>
                                    <RatingPieChart data={ratingData} />
                                </div>
                            </div>
                        </div>

                        {/* 2つ目のグラフ */}
                        <div className="border-2 border-white flex justify-center items-center w-full h-auto">
                            <div className="w-full aspect-w-1 aspect-h-1">
                                <div style={{ width: '100%', height: '100%' }}>
                                    <CountryRatingPieChart country="Japan" />
                                </div>
                            </div>
                        </div>

                        {/* 3つ目のグラフ */}
                        <div className="border-2 border-white flex justify-center items-center w-full h-auto">
                            <div className="w-full aspect-w-1 aspect-h-1">
                                <div style={{ width: '100%', height: '100%' }}>
                                    <CountryRatingPieChart country="Taiwan" />
                                </div>
                            </div>
                        </div>

                        {/* 4つ目のグラフ */}
                        <div className="border-2 border-white flex justify-center items-center w-full h-auto">
                            <div className="w-full aspect-w-1 aspect-h-1">
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

