import React from "react";
import { useContext, useState } from "react";
import { NotesContext } from "../App";

function SelectCategory(props) {
  const {
      listOfCategorys
  } = useContext(NotesContext)
    const [selectedCategory, setSelectedCategory] = useState('');
    const selectCategoryList = listOfCategorys.map((category) => {
      return (
        <option
          key={category.categoryId}
          value={category.newCategory}
        >{category.category}</option>
      );
    });


  function handleUpdateCategory(event) {
    setSelectedCategory(event.target.key)
    
  }
//  console.log(selectedCategory);
  return (
    <div>
      <select
        className="border rounded-lg bg-gray-900 p-1"
        onChange={props.handleUpdateCategory}
      >
        <option value="">Select Category</option>
        {selectCategoryList}
      </select>
    </div>
  );
}


export default SelectCategory;
