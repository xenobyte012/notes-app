import React from 'react';
import { useContext, useEffect } from 'react';
import { Outlet, useNavigate } from "react-router-dom";
import CategoryComponent from '../components/CategoryComponent'
import  CategoryExists  from "../components/CategoryExists";
import { NotesContext } from "../App";
import { v4 as uuidv4 } from "uuid";
import close_img from "../images/close.png";

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
    setCategoryCircle,
    categoryCircle,
    setIsCategoryPressed,
    isCategoryPressed,
  } = useContext(NotesContext);
  //console.log(notes)
  const categoryObject = {
    category: category,
    categoryId: categoryId,
    categoryCircle: categoryCircle,
  };
  
  const outputListOfCategorys = listOfCategorys.filter((filterAll) => filterAll.category !== "all").map((category) => {
    return (
      <CategoryComponent
        key={category.categoryId}
        category={category.category}
        categoryId={category.categoryId}
        categoryCircle={category.categoryCircle}
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



    setCategoryId(() => uuidv4());
    setCategory('')
  }
  
  function addCategory(event) {
    setIsCategoryPressed(false)
    setCategory(event.target.value);
     
  }

  let count = 0
  listOfCategorys.map(selected => selected.categoryCircle ? count += 1 : count)
  

  useEffect(() => {
    localStorage.setItem("categorysData", JSON.stringify(listOfCategorys));
  }, [listOfCategorys]);

  let pressTimer;

  const handleMouseDown = () => {
    pressTimer = setTimeout(() => {
      setIsCategoryPressed(true);
    }, 600);
  };
  const handleMouseUp = () => {
    clearTimeout(pressTimer);
  };
  
  function deleteCategories() {
    setListOfCategorys(prevCategory => {
      const UpadeListOfCategories = prevCategory.filter((category) => category.categoryCircle !== true);
      localStorage.setItem("categorysData", JSON.stringify(UpadeListOfCategories));
      return UpadeListOfCategories;
    })
    setCategoryCircle(false)
    setIsCategoryPressed(false)
  }

  
  const nvHome = useNavigate()
  return (
    <div className="bg-black   px-4 py-4  min-h-screen  text-white font-sans ">
      <div className="flex flex-row justify-between text-center pt-4 mb-6">
        <div className={`${isCategoryPressed ? "hidden" : "block"}`}>
          <button
            className={`bg-blue-600 px-4 py-1 font-sans rounded-xl `}
            onClick={() => {
              nvHome("/");
            }}
          >
            Back
          </button>
        </div>
                <div>
                  <img
                    src={close_img}
                    alt="close button"
                    className={`w-9 ${!isCategoryPressed? "hidden" : "block"}`}
                    onClick={() => {
                      setIsCategoryPressed(false);
                      setListOfCategorys(prev => 
                        prev.map(category => ({...category, categoryCircle : false}))
                      )
        
                    }
        
                    }
                  />
                </div>
        <div className="text-xl semibold">
          <span>{!isCategoryPressed ? "Category":`Selected ${count}`}</span>
        </div>
        <div>
          <button
            className="bg-red-600 px-4 py-1 font-sans rounded-xl"
            onClick={() => {deleteCategories()}}
          >
            Delete
          </button>
        </div>
      </div>
      {categoryExistsPopup && <CategoryExists />}
      <div
        className=""
        onTouchStart={handleMouseUp}
        onTouchEnd={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseDown={handleMouseDown}
      >
        {outputListOfCategorys}
      </div>
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