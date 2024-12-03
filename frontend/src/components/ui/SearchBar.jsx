/* eslint-disable react/prop-types */
import { useState } from "react";

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="mr-4 w-[400px] md:mx-0">
      <input
        className="w-full rounded-md p-3"
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search todos..."
      />
    </div>
  );
}

export default SearchBar;
