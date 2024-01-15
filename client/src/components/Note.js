import React from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const Note = (props) => {
    // function deleteitem(id){
    //     props.notechange((prevValue) => {
    //       return prevValue.filter((item,index) => {
    //         return index !== id;
    //       });
    //     });
    //   }
    
    function deleteitem(id){
      axios.post("http://localhost:5000/api/delete", { id })
        .then(res =>{props.notechange(res.data)})
        .catch(err => {console.log(err)})
    }


    return <div className="note">
        <h1>{props.title}</h1>
        <p>{props.content}</p>
        <IconButton onClick={()=>{deleteitem(props.index)}}><DeleteIcon /></IconButton>
    </div>
}

export default Note;