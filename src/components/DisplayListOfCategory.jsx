import React from 'react'
import { useContext } from 'react';
import { NotesContext } from '../App';
function DisplayListOfCategory(props) {
  const {
        categoryItems,
        setCategoryItems,
  } = useContext(NotesContext);
  
    function handleClick(clickedCategory) {
      setCategoryItems(clickedCategory);

  }
  // const [isClick, setIsClicked] = useState(true)
   //console.log(categoryItems);
    return (
      <div>
        <button
          className={`px-3 p-1 ${categoryItems !== props.category ? "bg-gray-600" : "bg-slate-900"} mr-2 rounded-xl font-serf`}
          onClick={() => handleClick(props.category)}
        >
          {props.category}
        </button>
      </div>
    );
}

export default DisplayListOfCategory