import React,{useState} from "react";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { Zoom } from '@mui/material';
import axios from "axios";

function CreateArea(props) {

  const [note, setnote] = useState({title: "", content: ""});

  function handleChange(event) {
    const {name, value} = event.target;
    setnote(prev => {
      return {...prev, [name]: value};
    });
  }

  function add() {
    if(note.title){
      axios.post("http://localhost:5000/api/addNew", note)
      .then(res => {
        props.notechange(res.data)
      })
      setnote({title: "", content: ""});
    }
  }


  const [clicked,setexpanded] = useState(false);
  
  function setexpand(){
    setexpanded(true);
  }

  return (
    <div>
      <form className="create-note">
        <input name="title" placeholder="Title" onChange={handleChange} value={note.title} style={{display:clicked?'block':'none'}}/>
        <textarea name="content" placeholder="Take a note..." rows={clicked?"3":"1"} onChange={handleChange} value={note.content} onClick={setexpand}/>
        <Zoom in={clicked}><Fab onClick={add}><AddIcon /></Fab></Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
