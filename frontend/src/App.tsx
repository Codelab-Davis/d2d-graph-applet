import { useState } from 'react';

import './App.css';


function App() {
  const [sheetId, setSheetId] = useState("hi");
  const [sum, setSum] = useState(0);

  const click = () => {
    let temp = 0; 
    
    fetch(`https://api.fureweb.com/spreadsheets/${sheetId}`, {
      method: "GET"
    })
      .then(response => response.json())
      .then(data => {
        for (let count = 0; count < data.data.length; count++) {
          temp += data.data[count]['a'];
          
          console.log(data.data[count]['a']);
        }
        setSum(temp);
        console.log(temp);
      })
      .catch(error => console.error(error))
    return temp;
  }
  // const spreadsheetId = '10WDbAPAY7Xl5DT36VuMheTPTTpqx9x0C5sDCnh4BGps'

  const change =  (event: React.ChangeEvent<HTMLInputElement>) => {
    setSheetId(event.target.value);
  }
  

  return (
    <div className = "App">
      <input onChange = {change}
      value = {sheetId}/>
      <button onClick =  {click}> sum is {sum}
      
      </button>
    
    </div>
  )
}

export default App