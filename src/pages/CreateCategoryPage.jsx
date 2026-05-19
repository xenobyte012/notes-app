import React from 'react';
import { useContext, useEffect } from 'react';
import { Outlet, useNavigate } from "react-router-dom";
import CategoryComponent from '../components/CategoryComponent'
import  CategoryExists  from "../components/CategoryExists";
import { NotesContext } from "../App";
import { v4 as uuidv4 } from "uuid";

function CreateCategoryPage() {
  const {
    listOfCategorys,
    setListOfCategorys,
    categoryId,
    setCategoryId,
    category,
    setCategory,
    categoryExistsPopup,
    setCategoryExistsPopup,
<<<<<<< HEAD
    categoryCircle,
    setCategoryCircle,
    isCategoryPressed,
    setIsCategoryPressed,
=======
    setCategoryCircle,
    categoryCircle
    
>>>>>>> d6d9be7
  } = useContext(NotesContext);
  //console.log(notes)
  const categoryObject = {
    category: category,
    categoryId: categoryId,
    categoryCircle: categoryCircle,
  };
  
<<<<<<< HEAD
  let pressTimer;
    const handleMouseDown = () => {
      pressTimer = setTimeout(() => {
        setIsCategoryPressed(true);
      }, 600);
    };
    const handleMouseUp = () => {
      clearTimeout(pressTimer);
    };

  //console.log(listOfCategorys)
=======
>>>>>>> d6d9be7
  const outputListOfCategorys = listOfCategorys.map((category) => {
    return (
      <CategoryComponent
        key={category.categoryId}
<<<<<<< HEAD
        len={category.category}
        category={category.category}
        handleMouseUp={handleMouseUp}
        handleMouseDown={handleMouseDown}
=======
        category={category.category}
        categoryId={category.categoryId}
        categoryCircle={category.categoryCircle}
>>>>>>> d6d9be7
      />
    );
  })


  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      addToListOfCategory()
    }
  }
  function addToListOfCategory() {
      let categoryExists = listOfCategorys
        .map((words) => words.category.toLowerCase())
      .includes(category.toLowerCase());
      
    if (categoryExists === true) {
      setCategory('');
      setCategoryExistsPopup(true)
      setTimeout(() => {
        setCategoryExistsPopup(false)
      },1000)
    } else {
      setListOfCategorys((prevCategories) => {
      //console.log(prevCategories);
      return [...prevCategories, categoryObject];
    });}

  
  //console.log(notes)

    setCategoryId(() => uuidv4());
    setCategory('')
  }
  
  function addCategory(event) {
    setCategory(event.target.value);
     
  }

  useEffect(() => {
    localStorage.setItem("categorysData", JSON.stringify(listOfCategorys));
  }, [listOfCategorys]);
<<<<<<< HEAD
  function CheckTheCircle(getItemNotes) {
    setCategory((prev) =>
      prev.map((note) =>
        getItemNotes.notesId === note.notesId
          ? { ...note, circle: !note.circle }
          : note,
      ),
    );
  }
=======


  

>>>>>>> d6d9be7
  
  function deleteNotes() {
    setCategory((prevNotes) => {
      const updatedNotes = prevNotes.filter((note) => note.categoryCircle !== true);
      localStorage.setItem("CategoryData", JSON.stringify(updatedNotes));

      return updatedNotes;
    });

    setIsCategoryPressed(false);
    setCategoryCircle(false);
  }

  const nvHome = useNavigate()
  return (
    <div className="bg-black   px-4 py-4  min-h-screen  text-white font-sans ">
      <div className="flex flex-row justify-between text-center pt-4 mb-6">
        <div>
          <button
            className="bg-blue-600 px-4 py-1 font-sans rounded-xl"
            onClick={() => {
              nvHome("/");
            }}
          >
            Back
          </button>
        </div>
        <div className="text-xl semibold">
          <span>Categories</span>
        </div>
        <div>
          <button
            className="bg-red-600 px-4 py-1 font-sans rounded-xl"
            onClick={() => deleteNotes()}
          >
            Delete
          </button>
        </div>
      </div>
      {categoryExistsPopup && <CategoryExists />}
      <div>{outputListOfCategorys}</div>
      <div className="justify-center  flex flex-col  bg-gray-900 border-rounded text-white rounded-2xl p-6 font-sans">
        <span className="justify-center flex mb-5 text-lg">Add Category</span>
        <div className="flex flex-row justify-between gap-2">
          <input
            value={category}
            onChange={addCategory}
            className="bg-black justify-center flex p-1  rounded-xl  pl-3 w-full"
            placeholder="Add Category"
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={() =>
              // fix later bug
              // console.log(category.replace(/\s+/g, " "))
              addToListOfCategory()
            }
            className="bg-blue-600 px-4 py-1 font-sans rounded-xl "
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateCategoryPage