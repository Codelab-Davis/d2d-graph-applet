import { useState } from 'react';

import './App.css';


function App() {
  const [sheetId, setSheetId] = useState("hi");
  const [sum, setSum] = useState(0);

  const click = () => {
    // temp was for adding variables to set to the sum
    let temp = 0; 
    
    fetch(`https://api.fureweb.com/spreadsheets/${sheetId}`, {
      method: "GET"
    })
      .then(response => response.json())
      .then(data => {
        for (let count = 0; count < data.data.length; count++) {
          //temp += data.data[count]['a'];
          let timeObject = data.data[count]['Time'];
          timeObject = timeObject.split(",");
          
          // print minutes
          console.log(timeObject[4]);

          // print seconds, get rid of trailing parenthesis
          console.log(timeObject[5].substring(0, timeObject[5].length - 1));

          // print cell A1, repeat for other cells
          console.log(data.data[count]['A1']);
        }
        setSum(temp);
        console.log(temp);
      })
      .catch(error => console.error(error))
    return temp;
  }
  // dummy variables
  // const spreadsheetId = '10WDbAPAY7Xl5DT36VuMheTPTTpqx9x0C5sDCnh4BGps'

  const change =  (event: React.ChangeEvent<HTMLInputElement>) => {
    setSheetId(event.target.value);
  }
  

  return (
    <div className = "App">
      <h1>D2D</h1>
      <input onChange = {change}
      value = {sheetId}/>
      <button onClick =  {click}> sum is {sum}
      
      </button>
    
    </div>
  )
}

export default App