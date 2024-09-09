import React, { useState, useRef, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import FavoriteButton from "../common/FavoriteButton";

import * as Checkbox from '@radix-ui/react-checkbox';
import * as Label from '@radix-ui/react-label';
import * as Dialog from '@radix-ui/react-dialog';
import { CheckIcon } from '@heroicons/react/24/outline';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem
} from '../ui/Select'; // Selectコンポーネントをインポート

interface Toilet {
    _id: string;
    name: string;
    address: string;
    rating: number;
    comment: string;
    universal: boolean;
    country: string;  // 国フィールド
}

const FilterSearchToile: React.FC = () => {
    const [toiletList, setToiletList] = useState<Toilet[]>([]);
    const [originalToiletList, setOriginalToiletList] = useState<Toilet[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [isTopRated, setIsTopRated] = useState<boolean>(false);
    const [showUniversal, setShowUniversal] = useState<boolean>(false);
    const [selectedCountry, setSelectedCountry] = useState<string>('All Country'); // 初期値として「All Country」を設定
    const [loading, setLoading] = useState<boolean>(true);
    const ref = useRef<HTMLInputElement>(null);

    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        fetchToilets();
    }, [currentPage]);

    const fetchToilets = async () => {
        try {
            const response = await axios.get(`${apiUrl}/toilets/filtered`, {
                params: {
                    page: currentPage,
                    limit: 30,
                },
            });
            const newToilets = response.data.toilets || [];
            if (newToilets.length < 30) {
                setHasMore(false);
            }
            setOriginalToiletList((prevToilets) => [...prevToilets, ...newToilets]);
            applyFilters(ref.current?.value || '', isTopRated, showUniversal, selectedCountry, [...toiletList, ...newToilets]);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching toilets:", error);
            setLoading(false);
        }
    };

    const handleSearch = () => {
        const searchValue = ref.current?.value.toLowerCase() || '';
        applyFilters(searchValue, isTopRated, showUniversal, selectedCountry);
    };

    const applyFilters = (
        searchTerm: string,
        topRated: boolean,
        universalOnly: boolean,
        country: string, // 国フィルター
        listToFilter: Toilet[] = originalToiletList
    ) => {
        let filtered = listToFilter.filter(toilet =>
            toilet.name.toLowerCase().includes(searchTerm) ||
            toilet.address.toLowerCase().includes(searchTerm)
        );
        if (topRated) {
            filtered = filtered.sort((a, b) => b.rating - a.rating);
        }
        if (universalOnly) {
            filtered = filtered.filter(toilet => toilet.universal);
        }
        if (country !== 'All Country') { // 「All Country」を選択した場合は国フィルターを適用しない
            filtered = filtered.filter(toilet => toilet.country === country);
        }
        setToiletList(filtered);
    };

    const toggleRatingFilter = () => {
        const newTopRated = !isTopRated;
        setIsTopRated(newTopRated);
        applyFilters(ref.current?.value || '', newTopRated, showUniversal, selectedCountry);
    };

    const toggleUniversalFilter = () => {
        const newShowUniversal = !showUniversal;
        setShowUniversal(newShowUniversal);
        applyFilters(ref.current?.value || '', isTopRated, newShowUniversal, selectedCountry);
    };

    const handleCountrySelect = (value: string) => {
        setSelectedCountry(value);
        applyFilters(ref.current?.value || '', isTopRated, showUniversal, value);
    };

    const handleScroll = () => {
        const windowHeight = window.innerHeight + document.documentElement.scrollTop;
        const documentHeight = document.documentElement.offsetHeight;
        if (windowHeight + 1 >= documentHeight && hasMore && !loading) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [hasMore, loading]);

    return (
        <div className="bg-background min-h-screen pt-20">
            <div className="container-SearchToile mx-auto p-6">
                <div className="SearchToile-wrapper bg-background p-6 rounded-lg shadow-md">
                    <h1 className="text-6xl font-bold text-white mb-2">Restroom list</h1>
                    <Link to="/" className="underline text-2xl text-white bg-background hover:text-highlight rounded-lg transition-colors">
                        Return to Home
                    </Link>

                    {/* PC用フィルター - 横並び */}
                    <div className="mt-5 hidden md:flex items-center space-x-4 text-xl text-white">
                        <h3 className="">Filter Option: </h3>

                        <div>
                            <Label.Root className="text-white">Top Rated :</Label.Root>
                            <Checkbox.Root
                                checked={isTopRated}
                                onCheckedChange={toggleRatingFilter}
                                className="bg-white border border-gray-300 w-5 h-5 ml-3"
                            >
                                {isTopRated && <CheckIcon className="w-4 h-4 text-black" />}
                            </Checkbox.Root>
                        </div>

                        <div>
                            <Label.Root className="text-white">Accessible :</Label.Root>
                            <Checkbox.Root
                                checked={showUniversal}
                                onCheckedChange={toggleUniversalFilter}
                                className="bg-white border border-gray-300 w-5 h-5 ml-3"
                            >
                                {showUniversal && <CheckIcon className="w-4 h-4 text-black" />}
                            </Checkbox.Root>
                        </div>

                        {/* 国ごとのフィルター */}
                        <div className="md:flex items-center">
                            <Label.Root className="text-white">Country :</Label.Root>
                            <Select onValueChange={handleCountrySelect}>
                                <SelectTrigger className="w-[180px] ml-3 ">
                                    <SelectValue placeholder="Select a country" />
                                </SelectTrigger>
                                <SelectContent className="">
                                    <SelectItem value="All Country">All Country</SelectItem> {/* すべての国 */}
                                    <SelectItem value="Japan">Japan</SelectItem>
                                    <SelectItem value="Taiwan">Taiwan</SelectItem>
                                    <SelectItem value="United States">United States</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* モバイル用フィルターモーダル */}
                    <div className="md:hidden mt-5">
                        <Dialog.Root>
                            <Dialog.Trigger className="bg-white text-background rounded-lg px-4 py-2">
                                Filter Options
                            </Dialog.Trigger>
                            <Dialog.Portal>
                                <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30" />
                                <Dialog.Content className="fixed bg-white p-6 rounded-lg shadow-lg w-4/5 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                    <Dialog.Title>Filter Options</Dialog.Title>

                                    <div className="mt-4">
                                        <Label.Root className="text-black">Top Rated</Label.Root>
                                        <Checkbox.Root
                                            checked={isTopRated}
                                            onCheckedChange={toggleRatingFilter}
                                            className="bg-white border border-gray-300 w-5 h-5"
                                        >
                                            {isTopRated && <CheckIcon className="w-4 h-4 text-black" />}
                                        </Checkbox.Root>
                                    </div>
                                    <div className="mt-4">
                                        <Label.Root className="text-black">Accessible</Label.Root>
                                        <Checkbox.Root
                                            checked={showUniversal}
                                            onCheckedChange={toggleUniversalFilter}
                                            className="bg-white border border-gray-300 w-5 h-5"
                                        >
                                            {showUniversal && <CheckIcon className="w-4 h-4 text-black" />}
                                        </Checkbox.Root>
                                    </div>

                                    {/* 国ごとのフィルター（モバイル用） */}
                                    <div className="mt-4">
                                        <Label.Root className="text-black">Country</Label.Root>
                                        <Select onValueChange={handleCountrySelect}>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Select a country" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="All Country">All Country</SelectItem> {/* すべての国 */}
                                                <SelectItem value="Japan">Japan</SelectItem>
                                                <SelectItem value="Taiwan">Taiwan</SelectItem>
                                                <SelectItem value="United States">United States</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <Dialog.Close className="mt-4 bg-background text-white rounded-lg px-4 py-2">Close</Dialog.Close>
                                </Dialog.Content>
                            </Dialog.Portal>
                        </Dialog.Root>
                    </div>

                    <input
                        type="text"
                        ref={ref}
                        onChange={handleSearch}
                        className="w-full mt-4 p-2 border border-gray-300 rounded"
                        placeholder="Search by name or address"
                    />
                    {loading ? (
                        <p className="text-center text-gray-500 mt-4">Loading...</p>
                    ) : (
                        <div className="SearchToile-shows grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 mb-6">
                            {toiletList.map((toilet) => (
                                <div className="box bg-gray-50 p-6 rounded-lg shadow-md" key={toilet._id}>
                                    <h3 className="text-2xl font-semibold text-gray-800 mb-2">{toilet.name}</h3>
                                    <FavoriteButton toiletId={toilet._id} />
                                    <p className="text-gray-600 mt-4 mb-2">{toilet.address}</p>
                                    <p className="text-gray-600 mb-2">Rating: {toilet.rating}</p>
                                    <p className="text-gray-600 mb-2">{toilet.comment}</p>
                                    <p className="text-gray-600 mb-4">Accessible: {toilet.universal ? "Yes" : "No"}</p>
                                    <Link
                                        to={`/toilet/${toilet._id}`}
                                        className="text-blue-600 hover:underline font-semibold"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                    {!hasMore && <p className="text-center text-red-700 text-2xl font-bold mt-4">No more toilets to load</p>}
                </div>
            </div>
        </div>
    );
};

export default FilterSearchToile;

