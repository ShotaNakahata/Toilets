import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { ChartContainer, ChartTooltipContent, ChartLegendContent } from "../ui/chart";

interface CountryToiletChartProps {}

interface CountryToiletData {
    _id: string;
    totalToilets: number;
    accessibleToilets: number;
}

const CountryToiletChart: React.FC<CountryToiletChartProps> = () => {
    const [data, setData] = useState<CountryToiletData[]>([]);

    const apiUrl = import.meta.env.VITE_API_URL;
    // const apiUrl = 'http://localhost:4000/api';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/toilets/country-summary`);
                console.log(response.data);
                setData(response.data);
            } catch (error) {
                console.error("Error fetching country summary", error);
            }
        };
        fetchData();
    }, [apiUrl]);

    const chartConfig = {
        totalToilets: {
            label: "Total Toilets",
            color: "#2563eb",
        },
        accessibleToilets: {
            label: "Accessible Toilets",
            color: "#60a5fa"
        },
    };

    return (
        <ChartContainer config={chartConfig} className=" min-h-[300px] w-full flex items-center justify-center">
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id"  
                tick={{ fill: "#FFFFFF", fontSize: 16 }}/>
                <YAxis />
                <Tooltip content={<ChartTooltipContent />}/>
                <Legend content={<ChartLegendContent />} wrapperStyle={{ color: "#FFFFFF", fontSize: "16px" }}/>
                <Bar dataKey="totalToilets" fill="var(--color-totalToilets)" />
                <Bar dataKey="accessibleToilets" fill="var(--color-accessibleToilets)" />
            </BarChart>
        </ChartContainer>
    );
};

export default CountryToiletChart;
