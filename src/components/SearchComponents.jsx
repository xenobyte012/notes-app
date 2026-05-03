import React from 'react'
import { NotesContext } from '../App';
import { useContext, useEffect, useState } from "react";

function SearchComponents() {
    const {
      notes,
      setNotes,
      isSearch,
      setIsSearch
    } = useContext(NotesContext);


    const [search, setSearch] = useState()

    function handleSearch() {

    }
    return (
      <div>
        <form>
          <div className='flex flex-row items-center justify-between  '>
            <div>
            <input
            type="Seach For Notes"
            placeholder="Search"
            className="bg-gray-900  text-white font-2xl rounded-full  p-3 px-4 font-lg font-sans outline-none mt-4"
            value={search}
            onChange={(e) => {handleSearch(e.target.value);
              setIsSearch(true)
            }}
            onClick={() => setIsSearch(true)}
          />
            </div>
            <div className={`${isSearch ? "hidden" : "block"}`}>
              <p className='text-blue-700 text-xl' onClick={() => setIsSearch(false)}>cancel</p>
            </div>
          </div>
          
        </form>
      </div>
    );
}

export default SearchComponents