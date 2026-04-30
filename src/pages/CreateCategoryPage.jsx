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
    notes
  } = useContext(NotesContext);
  //console.log(notes)
  const categoryObject = {
    category: category,
    categoryId: categoryId,
  };
  
  //console.log(listOfCategorys)
  const outputListOfCategorys = listOfCategorys.map((category) => {
    return <CategoryComponent key={category.categoryId} len={category.category} category={category.category}/>
  })

  const lst = listOfCategorys.find((check) => check.category == "all"); 
  //console.log(lst)
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

  const groupedCategory = notes.reduce((acc, item) => 
  {
    if (!acc[item.category]) {
      acc[item.category] = [];

    }
    acc[item.category].push(item.category);

    return acc;
  }, [])
  
  let group = Object.groupBy(notes, note => note.category)
  let gp = Object.entries(group).map(([category, items]) => ({
    category,
    count: items.length
  }))
 
  const results = gp.map(item => {
    return item.category
  })
  
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
            onClick={() => {}}
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