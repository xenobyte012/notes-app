import React, { useState } from 'react'
import { NotesContext } from "../App";
import { useContext } from "react";
import circle_img from "../images/circle-solid.png";
import selected_img from "../images/circle-check-solid.png";

function CategoryComponent(props) {  
  const {setCategory, categoryCircle, setCategoryCircle } =
    useContext(NotesContext);

  const [selectedCategory , setSelectedCategory] = useState(false)
  function CheckTheCircle(getItemNotes) {
    setCategory((prev) =>
      prev.map((note) =>
        getItemNotes.notesId === note.notesId
          ? { ...note, circle: !note.circle }
          : note,
      ),
    );
  }
  return (
    <div
      className="  bg-gray-900 border-rounded text-white my-2 rounded-2xl p-3 font-sans "
      onTouchStart={props.handleMouseUp}
      onTouchEnd={props.handleMouseDown}
      onMouseUp={props.handleMouseUp}
      onMouseDown={props.handleMouseDown}
    >
      <div className="flex flex-row  justify-between">
        <div>
          <span>{props.category}</span>
        </div>
        <div>
          {selectedCategory && (
            <img
              src={props.checkCircle ? selected_img : circle_img}
              alt="circle image"
              className="w-7"
              onClick={(e) => {
                e.stopPropagation();
                CheckTheCircle(props);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default CategoryComponent