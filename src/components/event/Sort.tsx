import React from "react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { SortByType, SortOrderType } from "@/types/event";

interface SortProps {
  sortBy: SortByType;
  setSortBy: React.Dispatch<React.SetStateAction<SortByType>>;
  sortOrder: SortOrderType;
  setSortOrder: React.Dispatch<React.SetStateAction<SortOrderType>>;
  filterDateRange: { startDate: string; endDate: string };
  setFilterDateRange: (range: { startDate: string; endDate: string }) => void;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  onApplyFilter: () => void;
  onClickClear: () => void;
}

const Sort = ({
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  filterDateRange,
  setFilterDateRange,
  search,
  setSearch,
  onApplyFilter,
  onClickClear,
}: SortProps) => {
  const handle = {
    sort: (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSortBy(e.target.value as SortByType);
    },
    order: () => {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    },
    dateChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFilterDateRange({
        ...filterDateRange,
        [name]: value,
      });
    },
    searchChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setSearch(value);
    },
  };

  return (
    <div>
      <label htmlFor="sort">Sort By:</label>
      <select
        id="sort"
        value={sortBy}
        onChange={handle.sort}
        style={{ marginLeft: 10 }}
      >
        <option value="name">Name</option>
        <option value="date">Date</option>
      </select>
      <button onClick={handle.order} style={{ marginLeft: 10 }}>
        {sortOrder === "asc" ? <AiFillCaretUp /> : <AiFillCaretDown />}
      </button>
      <div style={{ marginTop: 10 }}>
        <label htmlFor="startDate">Start Date:</label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          value={filterDateRange.startDate}
          onChange={handle.dateChange}
          style={{ marginLeft: 10 }}
        />
        <label htmlFor="endDate" style={{ marginLeft: 10 }}>
          End Date:
        </label>
        <input
          type="date"
          id="endDate"
          name="endDate"
          value={filterDateRange.endDate}
          onChange={handle.dateChange}
          style={{ marginLeft: 10 }}
        />
        <button onClick={onApplyFilter} style={{ marginLeft: 10 }}>
          Apply
        </button>
      </div>
      <div style={{ marginTop: 10 }}>
        <label htmlFor="search">Search:</label>
        <input
          type="text"
          id="search"
          value={search}
          onChange={handle.searchChange}
          style={{ marginLeft: 10 }}
        />
      </div>
      <button onClick={onClickClear} style={{ marginLeft: 10 }}>
        Clear
      </button>
    </div>
  );
};

export default Sort;
