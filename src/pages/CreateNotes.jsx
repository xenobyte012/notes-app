import React, { useContext, useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import SelectCategory from '../components/SelectCategory'
import { FormattedDate, FormattedTime } from '../utils/Date'
import { NotesContext } from '../App'
import { v4 as uuidv4 } from "uuid"; 


function CreateNotes() {
  const {
    notes,
    setNotes,
    notesId,
    setNotesId,
    title,
    setTitle,
    text,
    setText,
    modifiedDate,
    setModifiedDate,
    category,
    setCategory,
    circle,
    setIsPressed,
    setCircle
  } = useContext(NotesContext)

  const nvHome = useNavigate()

  // i must pass props here of date modified
  const date = new Date();

  const updateNotes = {
    notesId: notesId,
    title: title,
    text: text,
    category: category,
    modifiedDate: modifiedDate,
    circle: circle,

  };

  
  function handleUpdateTitle(event) {
    setTitle(event.target.value);
  }

  function handleUpdateText(event) {
    setText(event.target.value);
  }

  function handleUpdateCategory(event) {
    setCategory(event.target.value)
  }

  function handleUpdateModifiedDate(event) {
    setModifiedDate(event.target.value);
  }


  function updateAll() {

    if ( updateNotes !== '' || updateNotes.title !== '') {
      setNotes((oldNotes) => [...oldNotes, updateNotes])
      setNotesId(uuidv4())
      setTitle('')
      setText('')
      setCircle(false)
    
    }

    console.table(updateNotes);
  }

  useEffect(() => {
    localStorage.setItem("notesData", JSON.stringify(notes));
  }, [notes])

  const words = text.replace(/\s+/g, " ");
  let numberOfCharectores = words.length;


  
  return (
    <div className="bg-black  px-4 py-4  text-white font-sans">
      <div className="flex flex-row justify-between">
        <button
          className="bg-blue-600 px-4 py-1 font-sans rounded-xl"
          onClick={() => {
            nvHome("/");
            setIsPressed(false);
            updateAll();
          }}
        >
          Back
        </button>
        <button
          onClick={updateAll}
          className="bg-blue-600 px-4 py-1 font-sans rounded-xl p-6"
        >
          Save
        </button>
      </div>
      <div className="mb-4">
        <textarea
          value={title}
          onChange={handleUpdateTitle}
          placeholder="Title"
          name="note"
          id="title"
          className="
                    font-semibold mt-4 border-none text-xl type-text w-full focus:outline-none p-4 resize-none 
                    leading-relaxed  overflow-y-auto
                    scrollbar-none"
        ></textarea>
      </div>

      <div>
        <SelectCategory handleUpdateCategory={handleUpdateCategory} />
      </div>

      <div className="flex flex-row justify-between mt-4 mb-8 text-sm text-stone-500 mr-2 ">
        <div>
          <div className="flex flex-row gap-2">
            <FormattedDate date={date} /> | <FormattedTime date={date} />
          </div>
        </div>
        <div>Characters {numberOfCharectores} </div>
      </div>
      <div className="h-screen">
        <textarea
          onChange={handleUpdateText}
          value={text}
          placeholder="Start Typing...."
          className="
                      h-screen w-full p-6
                      border-none focus:outline-none
                      leading-relaxed text-base
                      resize-none
                      overflow-y-auto
                      scrollbar-none
                  "
        ></textarea>
      </div>
    </div>
  );
}

export default CreateNotes