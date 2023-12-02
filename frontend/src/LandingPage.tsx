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
  }

  function maxSlope(substrateData:Map<string, number[]>, substrate:string){
    const window:number[][] = [];
    let data:number[] = substrateData.get(substrate)!;
    let maxSlope = -Infinity
    let tempSlope = -Infinity
    for (let i = 0; i < data.length; i ++){
      if (window.length < 3) {
        window.push([i, data[i]]);
      }
      else{
        tempSlope = findSlope(window);
        maxSlope = Math.max(maxSlope, tempSlope);
        window.shift();
        window.push([i, data[i]]);
      }
    }

    tempSlope = findSlope(window);
    maxSlope = Math.max(maxSlope, tempSlope);
    return parseFloat(maxSlope.toPrecision(4));
  }

function findSlope(points:number[][]) {
    let size = points.length;
    let sumx = 0;
    let sumxsquard = 0;
    let sumy = 0;
    let sumxy = 0;

    for (let i = 0; i < points.length; i++){
    let x = points[i][0];
    let y = points[i][1];

    sumx += x;
    sumxsquard += x * x;
    sumy += y;
    sumxy += x * y;
    }
    let slope = (size * sumxy - sumx * sumy) / (size * sumxsquard - sumx * sumx);
    return slope;
}

function getRates() {
  const substrateTypes = Array.from(substrateData.keys());
    let currSubstrate:string = "";
    let allRateData:(string | number)[][] = [];
    let currRateData:(string | number)[] = [];
    for (let i = 0; i < substrateTypes.length; i++){
        if(i == 0) {
            currSubstrate = substrateTypes[i][0];
            currRateData.push(currSubstrate);
        }
        if(substrateTypes[i][0] != currSubstrate) {
            currSubstrate = substrateTypes[i][0];
            allRateData.push(currRateData);
            currRateData = []
            currRateData.push(currSubstrate);
        }
        currRateData.push(maxSlope(substrateData, substrateTypes[i]));
    }
    allRateData.push(currRateData);
    return allRateData;
}

function LandingPage(props: { rateData: (string | number)[][], setRateData: React.Dispatch<React.SetStateAction<(string | number)[][]>>, substrateData: Map<string, number[]>, setSubstrateData: React.Dispatch<React.SetStateAction<Map<string, number[]>>>, visible: Boolean, setVisibility: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [sheetId, setSheetId] = useState("");
    // const [sheetURL, setSheetURL] = useState("");

    const click = ()=>{
    fetch(`https://api.fureweb.com/spreadsheets/${sheetId}`, {
      method: "GET"
    })
      .then(response => response.json())
      .then(data => {
        getData(data.data);
        console.log(substrateData);
        props.setSubstrateData(substrateData);
        props.setRateData(getRates());
        props.setVisibility(true);
      })
      .catch(error => console.error(error))
    };

    // substrateData.set('A1', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]);
    // substrateData.set('A2', [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]);
    // substrateData.set('A3', [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);

    const change =  (event: React.ChangeEvent<HTMLInputElement>) => {
        // parse url for sheetId
        // setSheetURL(event.target.value);
        setSheetId(event.target.value.split('/')[5]);
    }

    const helpButtonClicked = () => {
      window.location.href = "https://www.youtube.com";
    }

    return (
      <div>
        <div className='flex flex-col justify-center items-center h-screen'>
          <div className="flex flex-col w-[95%]">
            <div className="flex flex-col justify-start bg-background-shape bg-cover h-[90vh] rounded-3xl">
              <img src='./public/assets/d2dlogo.png' className='object-contain ml-7 mt-1 w-[140px] min-[1450px]:w-[160px] min-[1650px]:w-[180px]'></img>
              <div className="flex flex-col flex-grow justify-center">
                <h1 className="mb-[3%] text-white font-manrope leading-normal">ENZYME RATE CALCULATOR</h1>
                <p className="mb-[1%] text-white text-[21px]">Please insert a valid spreadsheet URL</p>
                <div className="flex justify-between items-center self-center bg-white p-[4px] h-[67px] md:w-[608px] sm:w-[80%] rounded-[40px]">
                  <input onChange={change} className="grow pl-[20px] font-manrope font-medium text-base placeholder-grays-600 focus:outline-none" placeholder='Paste URL'></input>
                  <button onClick={click} className="mx-[10px] px-[21px] py-[11px] bg-secondary-600 hover:bg-secondary-700 rounded-[30px] text-base font-semibold font-manrope text-white">Calculate</button>
                </div>
              </div>
              <div className='flex justify-end'>
                <button><img src="./public/assets/helpButton.svg" onClick={helpButtonClicked} className="pb-[18px] pr-[18px]" /></button>
              </div>
            </div>
          </div>
        </div>
      </div>

    )
}

export default LandingPage;