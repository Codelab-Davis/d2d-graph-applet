import { useState } from 'react';

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
    console.log("finished parsing");
    console.log(substrateData);
    console.log(substrateData.get('A1'));
  }

function LandingPage(props: { substrateData: Map<string, number[]>, setSubstrateData: React.Dispatch<React.SetStateAction<Map<string, number[]>>>, visible: Boolean, setVisibility: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [sheetId, setSheetId] = useState("");
    const [sheetURL, setSheetURL] = useState("");

    const click = ()=>{
    fetch(`https://api.fureweb.com/spreadsheets/${sheetId}`, {
      method: "GET"
    })
      .then(response => response.json())
      .then(data => {
        getData(data.data);
        console.log(substrateData);
        props.setSubstrateData(substrateData);
        props.setVisibility(true);
      })
      .catch(error => console.error(error))      
    };

    // substrateData.set('A1', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]);
    // substrateData.set('A2', [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]);
    // substrateData.set('A3', [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);

    const change =  (event: React.ChangeEvent<HTMLInputElement>) => {
        // parse url for sheetId
        setSheetURL(event.target.value);
        setSheetId(event.target.value.split('/')[5]);
    }

    const helpButtonClicked = () => {
      console.log("You asked for help!");
      window.location.href = "https://www.youtube.com";
    }

    return (
      <div>
        <div className='flex flex-col justify-center items-center bg-gradient-to-t from-[#94d1d7d1] to-[#ffffffd1] h-screen'>
            <div className="flex flex-col w-[95%]">
                <div className="flex flex-col justify-start bg-background-shape bg-cover h-[90vh] rounded-3xl">
                    <img src='./src/assets/d2dlogo.png' className='object-contain ml-7 mt-1 w-[153px] min-[1450px]:w-[180px] min-[1650px]:w-[200px]'></img>
                    <div className="flex flex-col flex-grow justify-center">
                      <h1 className="mb-[3%] text-white font-manrope leading-normal">ENZYME RATE CALCULATOR</h1>
                      <p className="mb-[1%] text-white text-[21px]">Please insert a valid spreadsheet URL</p>
                      <div className="flex justify-between items-center self-center bg-white p-[4px] h-[67px] w-[608px] rounded-[40px]">
                          <input onChange = {change} className="grow pl-[20px] font-manrope font-medium text-base placeholder-grays-600 focus:outline-none" placeholder='Paste URL'></input>
                          <button onClick={click} className="mx-[10px] px-[21px] py-[11px] bg-secondary-600 rounded-[30px] text-base font-semibold font-manrope text-white">Calculate</button>
                      </div>  
                    </div>
                    <div className='flex justify-end'>
                    <button><img src="./src/assets/helpButton.svg" onClick={helpButtonClicked} className="pb-[18px] pr-[18px]"/></button>
                    </div>                                     
                </div>
            </div>
        </div>
      </div>
        
        
        
        
    )
}

export default LandingPage;