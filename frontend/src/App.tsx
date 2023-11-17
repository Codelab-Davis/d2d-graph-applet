import { useState } from 'react';

import './App.css';
import LandingPage from './LandingPage';
import RateTable from './RateTable';

function App() {
  const [substrateData, setSubstrateData] = useState(new Map<string, number[]>());
  const [visibility, setVisibility] = useState(false);


  return (
    <div className="bg-[#f7fcff]">
      <LandingPage substrateData={substrateData} setSubstrateData={setSubstrateData} visible={visibility} setVisibility={setVisibility}></LandingPage>
      <RateTable substrateData={substrateData} visible={visibility}></RateTable> 
    </div>
  )
}

export default App