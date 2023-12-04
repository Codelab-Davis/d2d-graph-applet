import { useState, useRef } from 'react';

import './App.css';
import LandingPage from './LandingPage';
import RateTable from './RateTable';
import GraphPage from './GraphPage';
import Footer from './Footer';

function App() {
  const [substrateData, setSubstrateData] = useState(new Map<string, number[]>());
  const [visibility, setVisibility] = useState(false);
  const [rateData, setRateData] = useState<(string | number)[][]>([]);
  const rateTableRef = useRef(null);


  return (
    <div className="bg-[#fdfdfd] dark:bg-grays-700">
      <LandingPage rateTableRef={rateTableRef} rateData={rateData} setRateData={setRateData} substrateData={substrateData} setSubstrateData={setSubstrateData} visible={visibility} setVisibility={setVisibility}></LandingPage>       
      <RateTable rateTableRef={rateTableRef} rateData={rateData} visible={visibility}></RateTable> 
      <GraphPage  substrateData={substrateData} visible={visibility}></GraphPage>
      <Footer></Footer>
    </div>
  )
}

export default App