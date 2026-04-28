import React from "react";
import { FormattedDate, FormattedTime } from "../utils/Date";
import { Outlet, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { NotesContext } from "../App";
import circle_img from "../images/circle-solid.png";
import selected_img from "../images/circle-check-solid.png"
function DisplayNotesComponent(props) {
  const {
    notes,
    setNotes,
    notesId,
    title,
    setTitle,
    text,
    setText,
    category,
    setCategory,
    modifiedDate,
    setModifiedDate,
    isPressed,
    circle
  } = useContext(NotesContext);

  const editNotes = useNavigate();
  const date = new Date(props.modifiedDate);
  const notesTextLength =
    props.text.length > 40 ? props.text.slice(0, 40) + "..." : props.text;

  function handleClickNotes(getItemNotes) {
    // editNotes('edit-notes')
    editNotes("edit-notes");
    let isClicked = true;
    const clickedNote = notes.find(
      (note) => note.notesId === getItemNotes.notesId,
    );
    if (!clickedNote) return;
    console.log(clickedNote.notesId);
    setText(clickedNote.text);
    setTitle(clickedNote.title);
    setModifiedDate(modifiedDate);

    setNotes((prev) =>
      prev.filter((note) => note.notesId !== getItemNotes.notesId),
    );
  }
  function CheckTheCircle(getItemNotes) {
    setNotes((prev) =>
      prev.map((note) =>
        getItemNotes.notesId === note.notesId
          ? { ...note, circle: !note.circle }
          : note,
      ),
    );

      
  }

  return (
    <div
      onClick={() => {
        handleClickNotes(props);
      }}
      onTouchStart={props.handleMouseUp}
      onTouchEnd={props.handleMouseDown}
      onMouseUp={props.handleMouseUp}
      onMouseDown={props.handleMouseDown}
      className="bg-slate-900 border-rounded text-white my-2 rounded-lg p-4 font-sans flex flex-row justify-between items-center"
    >
      <div>
        <div>
          <span className="text-xl">
            {props.title.length === 0 ? notesTextLength : props.title}
          </span>
        </div>
        <div className="text-stone-400 text-lg">
          <span>{props.text.length === 0 ? "No text" : notesTextLength}</span>
        </div>
        <div className="text-stone-500 text-sm mt-3">
          <div className="flex flex-row gap-2">
            <FormattedDate date={date} />
            <span>|</span>
            <FormattedTime date={date} />
          </div>
        </div>
      </div>
      <div>
        {isPressed && (
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
  );
}
      
export default DisplayNotesComponent;
        
        
        //</div>if the same id exist in notes
//   if it does don't save the file just edit the file when press save
