import React,{useState,useEffect} from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./createArea";
import axios from "axios";

function App() {
  const [notes, noteschange] = useState([]);
  
  useEffect(() => {
    axios.get("http://localhost:5000/api/getAll")
    .then(res => noteschange(res.data))
  },[])


  return (
    <div>
      <Header />
      <CreateArea notechange={noteschange}/>
      {notes.map(pass => (<Note key={pass._id} index={pass._id} title={pass.title} content={pass.content} notechange={noteschange}/>))}
      <Footer />
    </div>
  );
}

export default App;
