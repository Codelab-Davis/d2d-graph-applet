import { useState,useEffect } from 'react'
import axios from 'axios'

import './App.css'


function App() {
  const [sheetId, setSheetId] = useState("hi")
  const [sum, setSum] = useState(0)

  const click = () => {
    let temp = 0; 
    var instance = axios.create({
      baseURL: 'https://api.fureweb.com',
    })
    
    instance.get(`/spreadsheets/${sheetId}`)
      .then((res) => {
        for (let count = 0; count < res.data.data.length; count++) {
          temp += res.data.data[count]['a']
          
          console.log(res.data.data[count]['a']);
        }
        setSum(temp);
        console.log(temp);
      })
    return temp;
  }
  // const spreadsheetId = '10WDbAPAY7Xl5DT36VuMheTPTTpqx9x0C5sDCnh4BGps'

  const change =  (event: React.ChangeEvent<HTMLInputElement>) => {
    setSheetId(event.target.value)
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