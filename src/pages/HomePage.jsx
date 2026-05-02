import React from 'react'
import SearchComponents from '../components/SearchComponents';
import { Outlet, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { NotesContext } from '../App';
import DisplayNotesComponent from '../components/DisplayNotesComponent'
import DisplayListOfCategory from '../components/DisplayListOfCategory';

import delete_img from '../images/delete.png'
import pin_img from '../images/push-pin.png'
import move_img from '../images/move.png'
import close_img from '../images/close.png'


function HomePage() {
  const {
    notes,
    setNotes,
    listOfCategorys,
    categoryItems,
    isPressed,
    setIsPressed,
    cirle,
    setCircle,
    isSearch,
    setIsSearch
  } = useContext(NotesContext);
  const nvCreateNotes = useNavigate();
  const nvCategoryPage = useNavigate()

  const listOfNotes = [...notes]
  let pressTimer;

console.table(notes)

  const handleMouseDown = () => {
    pressTimer = setTimeout(() => {
      setIsPressed(true)
    },600)
  }
  const handleMouseUp = () => {
    clearTimeout(pressTimer)
  }
  //console.log(isPressed)
  
  const append =
    categoryItems === 'all' ?
      listOfNotes :
      listOfNotes.filter(selectedCategory => selectedCategory.category === categoryItems)
  //console.log(append)

  

  const displayNotes = append.reverse().map((notes) => {
    return (
      <DisplayNotesComponent
        notesId={notes.notesId}
        key={notes.notesId}
        title={notes.title}
        text={notes.text}
        modifiedDate={notes.modifiedDate}
        circle={notes.circle}
        setCircle={notes.setCircle}
        handleMouseUp={handleMouseUp}
        handleMouseDown={handleMouseDown}
        checkCircle={notes.circle}

      />
    );
  });


  
  const categoryList = listOfCategorys.map((category) => {
    return (
      <DisplayListOfCategory
        key={category.categoryId}
        category={category.category}
      />
    );
  });

  function deleteNotes() {
    setNotes(prevNotes => {
      const updatedNotes = prevNotes.filter(note => note.circle !== true);
      localStorage.setItem("notesData", JSON.stringify(updatedNotes));

      return updatedNotes;
    });


    setIsPressed(false)
    setCircle(false)
  }
 
  function selectedNote() {
    const numberOfSelectedNote = notes.filter(notes => notes.circle === true)
    return numberOfSelectedNote.length
  }


  return (
    <div className="bg-slate-950   px-4 py-4  min-h-screen  text-white font-sans">
      <div className={`flex justify-between ${isSearch ? "hidden" : "block"}`}>
        <div>
          <img
            src={close_img}
            alt="close button"
            className={`w-9 ${!isPressed ? "hidden" : "block"}`}
            onClick={() => {
              setIsPressed(false);
              setNotes(prev => 
                prev.map(note => ({...note, circle : false}))
              )

            }

            }
          />
        </div>
        <div>
          <button
            onClick={() => nvCategoryPage("category-page")}
            className="rounded-xl bg-blue-600 font-sans px-4 py-2 p-6 mr-2"
          >
            Add Category
          </button>
        </div>
      </div>
      <div className=" pt-4">
        <div>
          <h1 className="text-3xl ">
            {!isPressed ? "Notes" : `${selectedNote()} item selected`}
          </h1>
        </div>
      </div>
      <div>
        <SearchComponents />
      </div>

      <div className={`flex flex-row my-4 overflow-x-auto leading-relaxed ${!isSearch ? "hidden" : "block"} `}>
        {categoryList}
      </div>
      <div>{displayNotes}</div>
      <div className="flex mb-6">
        <button
          onClick={() => nvCreateNotes("create-notes")}
          className={`rounded-xl bg-blue-600 font-sans px-4 py-2 fixed bottom-14 right-10 ${isPressed ? "hidden" : "block"}  `}
        >
          New Notes
        </button>
      </div>
      <div
        className={` grid grid-cols-3 w-full justify-between  items-center  py-3 fixed bottom-0 right-0 bg-slate-950 text-[12px] text-white text-center ${isPressed ? "block" : "hidden"}`}
      >
        <div className="flex justify-center flex-col gap-1  items-center">
          <img src={pin_img} className="w-7" />
          <div>pin</div>
        </div>
        <div className="flex justify-center flex-col gap-1  items-center">
          <img src={move_img} className="w-7" />
          <div>move to</div>
        </div>
        <div className="flex justify-center flex-col gap-1 items-center "
          onClick={() => deleteNotes()}
          >
          <img src={delete_img} className="w-7 flex justify-center" 
            
          />
          <div>delete</div>
        </div>
      </div>
    </div>
  );
}

export default HomePage



// 