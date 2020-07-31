import React from "react";
import ReactDOM from "react-dom";
import _ from 'lodash';


const CowTable = ({cows, selectCow}) => {



  return (
    <ul>
      {_.map(cows, (cow) => {
        //console.log('Cow: ', cow)
        return (
          <li
            key={cow.name}
            onClick={() => selectCow(cow)}
          >
            {cow.name}
          </li>
        )
      })}
    </ul>
  )
}



export default CowTable;