import React, { useState } from 'react'
import { NotesContext } from "../App";
import { useContext } from "react";
import circle_img from "../images/circle-solid.png";
import selected_img from "../images/circle-check-solid.png";

function CategoryComponent(props) {  
  const {listOfCategorys, setListOfCategorys, categoryCircle, setCategoryCircle } =
    useContext(NotesContext);

  const [selectedCategory , setSelectedCategory] = useState(false)


  function checkTheCircle(clickedItem) {
    console.log(clickedItem)
    setListOfCategorys( prev => {
      return (
      prev.map((category) =>
        clickedItem.categoryId === category.categoryId
          ? { ...category, categoryCircle: !category.categoryCircle }
          : category,
      )
      )
    })
  }

  return (
    <div className="  bg-gray-900 border-rounded text-white my-2 rounded-2xl p-3 font-sans ">
      <div className="flex flex-row  justify-between">
        <div>
          <span>{props.category}</span>
        </div>
        <div>
          <img
            src={props.categoryCircle ? selected_img : circle_img}
            alt="circle"
            className="w-7"
            onClick={(e) => {
              e.stopPropagation();
              checkTheCircle(props)
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default CategoryComponent