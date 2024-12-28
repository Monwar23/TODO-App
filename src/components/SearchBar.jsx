import { useState } from "react";

const SearchBar = ({ data, onFilter, keys, placeholder = "Search...." }) => {

    const [searchTerm, setSearchTerm] = useState("")
    const handleSearch = (term) => {
        setSearchTerm(term)
        const filteredData = data.filter((item) => keys.some((key) => item[key]?.toString().toLowerCase().includes(term.toLowerCase()))
        );
        onFilter(filteredData)
    };

    return (
        <div className="flex justify-center mt-4">
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder={placeholder}
                className="border py-2 px-4 border-orange-500 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
        </div>
    );
};

export default SearchBar;