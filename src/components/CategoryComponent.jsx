import React, { useState } from 'react'
import { NotesContext } from "../App";
import { useContext } from "react";
import circle_img from "../images/circle-solid.png";
import selected_img from "../images/circle-check-solid.png";

function CategoryComponent(props) {  
  const { categoryCircle, setCategoryCircle } =
    useContext(NotesContext);

  const [selectedCategory , setSelectedCategory] = useState(false)

  return (
    <div className="  bg-gray-900 border-rounded text-white my-2 rounded-2xl p-3 font-sans ">
      <div className="flex flex-row  justify-between">
        <div>
          <span>{props.category}</span>
        </div>
        <div>
          <img
            src={circle_img}
            alt="circle"
            className="w-7"
            onClick={(e) => {
              e.stopPropagation();
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default CategoryComponent