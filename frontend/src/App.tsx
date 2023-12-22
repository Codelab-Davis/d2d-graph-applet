import { useState, useRef } from 'react';

import './App.css';
import LandingPage from './LandingPage';
import RateTable from './RateTable';
import GraphPage from './GraphPage';
import Footer from './Footer';
import Walkthrough from './Walkthrough';
import { JoyrideState } from './Types';

function App() {
  const [substrateData, setSubstrateData] = useState(new Map<string, number[]>());
  const [visibility, setVisibility] = useState(false);
  const [rateData, setRateData] = useState<(string | number)[][]>([]);
  // State for walkthrough (react-joyride)
  const [joyrideState, setJoyrideState] = useState<JoyrideState>(
    {
      run: false,
      stepIndex: 0,
      steps: [],
      tourActive: false
    }
  )
  const rateTableRef = useRef(null);

  return (
    <div className="bg-[#fdfdfd] dark:bg-grays-700">
      <Walkthrough joyrideState={joyrideState} setJoyrideState={setJoyrideState} />
      <LandingPage
        rateTableRef={rateTableRef}
        rateData={rateData}
        setRateData={setRateData}
        substrateData={substrateData}
        setSubstrateData={setSubstrateData}
        visible={visibility}
        setVisibility={setVisibility}
        joyrideState={joyrideState}
        setJoyrideState={setJoyrideState}
      />
      <RateTable rateTableRef={rateTableRef} rateData={rateData} visible={visibility}></RateTable>
      <GraphPage substrateData={substrateData} visible={visibility}></GraphPage>
      <Footer/>
    </div>
  )
}

export default App
