import HomePage from "./pages/HomePage";
import CreateNotes from "./pages/CreateNotes";
import CreateCategoryPage from "./pages/CreateCategoryPage";
import { Route, Routes } from "react-router-dom";
import { Outlet, useNavigate } from "react-router-dom"
import { useState, createContext } from "react";
import { v4 as uuidv4 } from "uuid"; // ✅ added

export const NotesContext = createContext();

function App() {
  const [notes, setNotes] = useState(() => {
    const stored = localStorage.getItem("notesData");
    return stored ? JSON.parse(stored) : [];
  });
  
  const [listOfCategorys, setListOfCategorys] = useState(() => {
    const categorysStored = localStorage.getItem("categorysData");
    return categorysStored
      ? JSON.parse(categorysStored)
      : [{ category: "all", categoryId: uuidv4() }]; 
  });
  
  const [notesId, setNotesId] = useState(uuidv4()); 
  const [categoryId, setCategoryId] = useState(uuidv4());
  const [now, setNow] = useState(new Date())
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [category, setCategory] = useState('')
  const [modifiedDate, setModifiedDate] = useState(now)
  const [circle, setCircle] = useState(false)
  const [categoryCircle, setCategoryCircle] = useState(false)
  const [categoryItems, setCategoryItems] = useState("all")
  const [categoryExistsPopup, setCategoryExistsPopup] = useState(false)
  const [isSearch, setIsSearch] = useState(false)
    const [search, setSearch] = useState('')
  const [isPressed, setIsPressed] = useState(false);
  const [isCategoryPressed, setIsCategoryPressed] = useState(false)
  const value = {
    listOfCategorys,
    setListOfCategorys,
    categoryId,
    setCategoryId,
    notes,
    setNotes,
    setNotesId,
    notesId,
    title,
    setTitle,
    text,
    setText,
    category,
    circle,
    setCircle,
    setCategory,
    modifiedDate,
    setModifiedDate,
    categoryItems,
    setCategoryItems,
    categoryExistsPopup,
    setCategoryExistsPopup,
    isPressed,
    setIsPressed,
    isSearch,
    setIsSearch,
    search,
    setSearch,
    categoryCircle,
    setCategoryCircle,
    isCategoryPressed,
    setIsCategoryPressed,
  };
  return (
    <NotesContext.Provider
      value={value}
    >
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create-notes" element={<CreateNotes />} />
          <Route path="/edit-notes" element={<CreateNotes />} />
          <Route path="/home-page" element={<HomePage />} />
          <Route path="/category-page" element={<CreateCategoryPage />} />
        </Routes>
      </div>
    </NotesContext.Provider>
  );
}

export default App;