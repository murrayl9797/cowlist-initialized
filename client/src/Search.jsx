import React, {useState} from "react";
import ReactDOM from "react-dom";
import _ from 'lodash';


const Search = ({onClickInsertCow}) => {
  var [name, updateName] = useState('');
  var [desc, updateDesc] = useState('');

  const handleSubmit = () => {
    if (name && desc) {
      onClickInsertCow(name, desc)
      updateName('')
      updateDesc('')
    } else {
      alert('Please ensure name and description are non-empty')
    }
  }

  return (
    <div>
      <input
            placeholder="Cow name here"
            onChange={(e) => {
              updateName(e.target.value)
            }}
            value={name}
      >
      </input>
      <br/>
      <input
            placeholder="Cow Description here"
            onChange={(e) => {
              updateDesc(e.target.value)
              //console.log(text)
            }}
            value={desc}
      >
      </input>

      <button onClick={() => handleSubmit()}>
        Submit
      </button>
    </div>
  )
}



export default Search;