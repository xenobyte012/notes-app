import React from "react";
import { NotesContext } from "../App";
import { useContext } from "react";

function SearchComponents() {
  const { isSearch, setIsSearch, search, setSearch } = useContext(NotesContext);

  function handleSearch(event) {
    setSearch(event.target.value);
    setIsSearch(true);
    console.log(search);
  }
  return (
    <div>
      <form>
        <div className="flex flex-row items-center justify-between  ">
          <div className="w-full">
            <input
              type="Seach For Notes"
              value={search}
              placeholder="Search"
              className="bg-gray-900 w-full text-white font-2xl rounded-full pl-5  p-3 px-4 font-lg font-sans outline-none "
              value={search}
              onChange={handleSearch}
              onClick={() => setIsSearch(false)}
            />
          </div>
          <div className={`${!isSearch ? "hidden" : "block"} pl-2`}>
            <p
              className="text-blue-700 text-xl"
              onClick={() => {
                setIsSearch(false);
                setSearch("");
              }}
            >
              cancel
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SearchComponents;
