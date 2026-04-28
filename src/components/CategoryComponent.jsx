import React from 'react'
import { NotesContext } from "../App";
import { useContext } from "react";

function CategoryComponent(props) {  
  const {
    notes,
    listOfCategorys
  } = useContext(NotesContext)

  let groupCategory = Object.groupBy(notes, (note) => note.category);
  let countGroupedCategory = Object.entries(groupCategory).map(([category, items]) => ({
    category,
    count: items.length,
  }));
  const results = countGroupedCategory.map(item => {
    return item === 'katlego' ? item.count : 0;
    
  })
  //console.log(results)

  const l = countGroupedCategory.find(find => props.len == find)
    //const resultss = l.map(item => item);
  //-vconsole.log(l);

  return (
    <div className=" justify-between flex flex-row bg-gray-900 border-rounded text-white my-2 rounded-2xl p-3 font-sans ">
      <div>
        <span>{props.category}</span>
      </div>
      <div>
        <span>{props.len === "all" ? (notes.length)  : ''}</span>
      </div>
    </div>
  );
}

export default CategoryComponent