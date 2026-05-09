import React from "react";


function NoteComponent(props) {
  // creating a state to hold list of category
  // const  = useNavigate();

  return (
    <div
      
      className="bg-gray-900 border-rounded text-white my-2 rounded-lg p-4 font-sans "
    >
      <div>
        <span className="text-xl">{props.title}</span>
      </div>
      <div className="text-stone-400 text-lg">
        <span>piece of the text on notes here </span>
      </div>
      <div className="text-stone-500 text-sm mt-3">
        <div className="flex flex-row gap-2">
          <div>date</div>
          <div>time</div>
        </div>
        <span>{props.dateModified}</span>
      </div>
    </div>
  );
}

export default NoteComponent;
