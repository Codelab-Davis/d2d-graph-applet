import { useState } from 'react';
import Graph from './Graph.tsx' 

const substrateData = new Map<string, number[]>();

function getData(data:[]){
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  
    for (let dataIndex = 0; dataIndex < data.length; dataIndex++ ){
      for (let letter = 0; letter < letters.length; letter ++) {
        for (let number = 0; number < numbers.length; number ++) {
          let substrate = letters[letter] + numbers[number];
          // console.log(data[dataIndex][substrate]);
  
          if (dataIndex == 0) {
            substrateData.set(substrate, []);
          }
          substrateData.get(substrate)?.push(data[dataIndex][substrate])
        }
      }
    }
    console.log(substrateData.get('A1'));
  }

function LandingPage() {
    const [sheetId, setSheetId] = useState("");
    const [sheetURL, setSheetURL] = useState("");
    const click = ()=>{
    fetch(`https://api.fureweb.com/spreadsheets/${sheetId}`, {
      method: "GET"
    })
      .then(response => response.json())
      .then(data => {
        getData(data.data);
      })
      .catch(error => console.error(error))

      
    };

    substrateData.set('A1', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]);
    substrateData.set('A2', [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]);
    substrateData.set('A3', [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);



    const change =  (event: React.ChangeEvent<HTMLInputElement>) => {
        // parse url for sheetId
        setSheetURL(event.target.value);
        setSheetId(event.target.value.split('/')[5]);
      }

    return (
        <div className='flex justify-center items-center bg-cover bg-center bg-landing-page h-fit'>
            <div className="flex flex-col self-center w-[70%]">
                <div className="flex justify-start my-14 h-fit w-fit">
                    <img src='./src/assets/d2dlogo.png' className='object-contain ml-6 w-[153px]'></img>
                </div>
                <div className="flex flex-col justify-between items-center mb-44 py-[163px] bg-white rounded-3xl">
                    <h1 className="mb-[54px] text-grays-700">ENZYME RATE CALCULATOR</h1>
                    <h3 className="mb-[10px] text-grays-700">Please insert a valid spreadsheet URL</h3>
                    <div className="flex justify-between items-center border-2  border-grays-400 mb-[36px] p-[4px] h-[67px] w-[516px] rounded-[40px]">
                        <input className="grow pl-[20px] font-manrope font-medium text-base placeholder-grays-600 focus:outline-none" placeholder='Paste URL' onChange = {change}
                value = {sheetURL}></input>
                        <button onClick={click} className="mx-[6px] px-[20px] h-[47px] bg-secondary-500 rounded-[30px] text-base font-semibold font-manrope text-white">Calculate</button>
                    </div>
                    <div className="flex justify-center gap-2">
                        <a className="text-base font-manrope font-medium underline text-grays-700" href="https://www.youtube.com/">How it works</a>
                        <img src="./src/assets/orangeButton.svg"></img>
                    </div>                   
                </div>
            </div>
            <Graph substrateData={substrateData} substrates={['A1', 'A2', 'A3']}  title = {"a1-a3"}  ></Graph>

        </div>
        
        
    )
}

export default LandingPage;