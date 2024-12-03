import React from "react";
import { useSearchParams } from "react-router-dom";
import "./styles/SortFilter.scss";

const SortFilter = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const handleSortChange = (event) => {
        const [sortType, order] = event.target.value.split(",");
        searchParams.set("sort", sortType);
        searchParams.set("order", order);
        setSearchParams(searchParams);
    };

    const currentSort = `${searchParams.get("sort")},${searchParams.get("order")}`;

    return (
        <div className="sort-filter">
            <label htmlFor="sort-dropdown" className="sort-label">Sort:</label>
            <select
                id="sort-dropdown"
                className="sort-dropdown"
                value={currentSort || ""}
                onChange={handleSortChange}
            >
                <option value="date,DESC">New</option>
                <option value="date,ASC">Old</option>
                <option value="likes,DESC">Popular</option>
                <option value="likes,ASC">Unpopular</option>
            </select>
        </div>
    );
};

export default SortFilter;
