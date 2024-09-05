// frontend/src/features/Chart/CountryRatingPieChart.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Legend } from "recharts";
import { createPortal } from "react-dom";

interface RatingSummaryData {
    _id: number;
    count: number;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

const CustomLabel = ({ x = 0, y = 0, _id = 0, count = 0, showLabel = false }: {
    x?: number;
    y?: number;
    _id?: number;
    count?: number;
    showLabel?: boolean;
}) => {
    if (!showLabel) return null;

    const labelStyles: React.CSSProperties = {
        position: 'absolute',
        left: `${x}px`,
        top: `${y}px`,
        background: 'rgba(0, 0, 0, 0.7)',
        color: 'white',
        padding: '4px 8px',
        borderRadius: '4px',
        pointerEvents: 'none',
        whiteSpace: 'nowrap',
        zIndex: 9999,
    };

    return createPortal(
        <div style={labelStyles}>
            {`Rating:${_id} Count: ${count}`}
        </div>,
        document.body
    );
};

const CountryRatingPieChart: React.FC<{ country: string }> = ({ country }) => {
    const [data, setData] = useState<RatingSummaryData[]>([]);
    const [hoveredSlice, setHoveredSlice] = useState<{ x: number, y: number, _id: number, count: number } | null>(null);

    // 環境変数からAPIのURLを取得
    const apiUrl = import.meta.env.VITE_API_URL;
    // const apiUrl = 'http://localhost:4000/api';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/toilets/ratings/${country}`);
                setData(response.data);
            } catch (error) {
                console.error(`Error fetching ratings summary for ${country}`, error);
            }
        };
        fetchData();
    }, [country, apiUrl]);

    return (
        <div className="flex flex-col items-center justify-center p-4 h-full max-w-56 relative">
            <h2 className="text-2xl font-bold text-center ">{country} Ratings Summary</h2>
            <div className="w-full h-full relative flex items-center justify-center">
                <PieChart width={200} height={200}>
                    <Pie
                        data={data}
                        dataKey="count"
                        nameKey="_id"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        label={false}
                        onMouseEnter={(data, index, e) => setHoveredSlice({ x: e.pageX, y: e.pageY, _id: data._id, count: data.count })}
                        onMouseLeave={() => setHoveredSlice(null)}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Legend />
                </PieChart>

                {/* カスタムラベルをレンダリング */}
                {hoveredSlice && (
                    <CustomLabel
                        x={hoveredSlice.x}
                        y={hoveredSlice.y}
                        _id={hoveredSlice._id}
                        count={hoveredSlice.count}
                        showLabel={!!hoveredSlice}
                    />
                )}
            </div>
        </div>
    );
};

export default CountryRatingPieChart;




