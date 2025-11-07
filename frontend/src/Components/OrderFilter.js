import React from 'react';
import '../Pages/Orders.css';

function OrderFilter({ filters, onFilterChange }) {
    return (
        <div>
            <div className="filters-sidebars" id="filtersSidebars">
                <h2 className="filters-titles">Filters</h2>

                {/* ORDER STATUS */}
                <div className="filter-sections">
                    <div className="filter-headings">ORDER STATUS</div>

                    <div className="filter-options">
                        <input
                            type="checkbox"
                            className="filter-checkboxs"
                            id="onTheWay"
                            checked={filters.status.onTheWay}
                            onChange={onFilterChange}
                        />
                        <label className="filter-labels" htmlFor="onTheWay">
                            On the way
                        </label>
                    </div>

                    <div className="filter-options">
                        <input
                            type="checkbox"
                            className="filter-checkboxs"
                            id="delivered"
                            checked={filters.status.delivered}
                            onChange={onFilterChange}
                        />
                        <label className="filter-labels" htmlFor="delivered">
                            Delivered
                        </label>
                    </div>

                    <div className="filter-options">
                        <input
                            type="checkbox"
                            className="filter-checkboxs"
                            id="cancelled"
                            checked={filters.status.cancelled}
                            onChange={onFilterChange}
                        />
                        <label className="filter-labels" htmlFor="cancelled">
                            Cancelled
                        </label>
                    </div>

                    <div className="filter-options">
                        <input
                            type="checkbox"
                            className="filter-checkboxs"
                            id="returnRequested"
                            checked={filters.status.returnRequested}
                            onChange={onFilterChange}
                        />
                        <label className="filter-labels" htmlFor="returnRequested">
                            Return Requested
                        </label>
                    </div>

                </div>

                {/* ORDER TIME */}
                <div className="filter-sections">
                    <div className="filter-headings">ORDER TIME</div>

                    <div className="filter-options">
                        <input
                            type="checkbox"
                            className="filter-checkboxs"
                            id="last30days"
                            checked={filters.time.last30days}
                            onChange={onFilterChange}
                        />
                        <label className="filter-labels" htmlFor="last30days">
                            Last 30 days
                        </label>
                    </div>

                    <div className="filter-options">
                        <input
                            type="checkbox"
                            className="filter-checkboxs"
                            id="year2024"
                            checked={filters.time.year2024}
                            onChange={onFilterChange}
                        />
                        <label className="filter-labels" htmlFor="year2024">
                            2024
                        </label>
                    </div>

                    <div className="filter-options">
                        <input
                            type="checkbox"
                            className="filter-checkboxs"
                            id="year2023"
                            checked={filters.time.year2023}
                            onChange={onFilterChange}
                        />
                        <label className="filter-labels" htmlFor="year2023">
                            2023
                        </label>
                    </div>

                    <div className="filter-options">
                        <input
                            type="checkbox"
                            className="filter-checkboxs"
                            id="year2022"
                            checked={filters.time.year2022}
                            onChange={onFilterChange}
                        />
                        <label className="filter-labels" htmlFor="year2022">
                            2022
                        </label>
                    </div>

                    <div className="filter-options">
                        <input
                            type="checkbox"
                            className="filter-checkboxs"
                            id="year2021"
                            checked={filters.time.year2021}
                            onChange={onFilterChange}
                        />
                        <label className="filter-labels" htmlFor="year2021">
                            2021
                        </label>
                    </div>

                    <div className="filter-options">
                        <input
                            type="checkbox"
                            className="filter-checkboxs"
                            id="older"
                            checked={filters.time.older}
                            onChange={onFilterChange}
                        />
                        <label className="filter-labels" htmlFor="older">
                            Older
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderFilter;
