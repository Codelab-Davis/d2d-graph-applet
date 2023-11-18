import { useState } from 'react';

import './App.css';
import LandingPage from './LandingPage';
import RateTable from './RateTable';
import GraphPage from './GraphPage';

function App() {
  const [substrateData, setSubstrateData] = useState(new Map<string, number[]>());
  const [visibility, setVisibility] = useState(false);
  const [rateData, setRateData] = useState<(string | number)[][]>([]);


  return (
    <div className="bg-[#f7fcff]">
      <LandingPage rateData={rateData} setRateData={setRateData} substrateData={substrateData} setSubstrateData={setSubstrateData} visible={visibility} setVisibility={setVisibility}></LandingPage>
      <RateTable rateData={rateData} visible={visibility}></RateTable> 
      <GraphPage  substrateData={substrateData} visible={visibility}></GraphPage>
    </div>
  )
}

export default App