import React, { useState } from "react";
import { PieChart, Pie, Cell, Legend } from "recharts"; 
import { createPortal } from "react-dom";

interface RatingSummaryData {
    _id: number;
    count: number;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

const CustomLabel = ({ x, y, _id, count, showLabel }: any) => {
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
            {`Rating: ${_id}, Count: ${count}`}
        </div>,
        document.body
    );
};

const RatingPieChart: React.FC<{ data: RatingSummaryData[] }> = ({ data }) => {
    const [hoveredSlice, setHoveredSlice] = useState<{ x: number, y: number, _id: number, count: number } | null>(null);

    return (
        <div className="flex flex-col items-center justify-center p-4 h-full w-full relative">
            <h2 className="flex text-2xl font-bold text-center ">Overall Ratings Summary</h2>
            <div className="w-full h-full relative items-center flex justify-center">
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

export default RatingPieChart;








