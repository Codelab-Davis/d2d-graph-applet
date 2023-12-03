import { useState } from 'react';

import './App.css';
import LandingPage from './LandingPage';
import RateTable from './RateTable';
import GraphPage from './GraphPage';
import Footer from './Footer';
import { JoyrideState } from './Types';
import Joyride, { Step, CallBackProps } from 'react-joyride';

function App() {
  const steps: Step[] = [
    {
      target: "#url-input",
      content: "Paste in your spreadsheet URL here!",
      disableBeacon: true,
    },
    {
      target: "#calculate-button",
      content: "After pasting the link, click here!"
    }
    // {
    //   target: "#rate-table",
    //   content: "Here is the enzyme reaction rate data."
    // },
    // {
    //   target: "#export-button",
    //   content: "Use this button to download a csv file of the table data"
    // },
    // {
    //   target: "#graphs",
    //   content: "These are the graphs corresponding to the rate table"
    // }
  ];

  const [substrateData, setSubstrateData] = useState(new Map<string, number[]>());
  const [visibility, setVisibility] = useState(false);
  const [rateData, setRateData] = useState<(string | number)[][]>([]);
  const [joyrideState, setJoyrideState] = useState<JoyrideState>(
    {
      run: false,
      stepIndex: 0,
      steps: steps,
      tourActive: false
    }
  )

  const handleCallback = (data: CallBackProps) => {
    const { action, index, lifecycle, type } = data;
    // console.log(data);
    // if (type === "step:after" && index === 0) {
    //   console.log("hi")
    //   setJoyrideState(Object.assign(joyrideState, { run: false, stepIndex: -1 }))
    // }
    if (type === "step:after") {
      if (index === 1) {
        setJoyrideState(prevState => ({
          ...prevState,
          run: false
        }))
      } else {
        setJoyrideState(prevState => ({
          ...prevState,
          stepIndex: prevState.stepIndex + 1
        }))
      }

    }
  }

  return (
    <div className="bg-[#fdfdfd]">
      <Joyride
        continuous
        steps={steps}
        run={joyrideState.run}
        stepIndex={joyrideState.stepIndex}
        callback={handleCallback}
      />

      <LandingPage
        rateData={rateData}
        setRateData={setRateData}
        substrateData={substrateData}
        setSubstrateData={setSubstrateData}
        visible={visibility}
        setVisibility={setVisibility}
        joyrideState={joyrideState}
        setJoyrideState={setJoyrideState}
      />
      <p>{JSON.stringify(joyrideState)}</p>
      <RateTable rateData={rateData} visible={visibility}></RateTable>
      <GraphPage substrateData={substrateData} visible={visibility}></GraphPage>
      <Footer></Footer>
    </div>
  )
}

export default App