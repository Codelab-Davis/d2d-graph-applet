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
      disableScrolling: true
    },
    {
      target: "#calculate-button",
      content: "After pasting the link, click here!",
      disableScrolling: true,
    },
    {
      target: "#rate-table",
      content: "Here is the enzyme reaction rate data.",
      placement: "top"
    },
    {
      target: "#export-button",
      content: "Use this button to download a csv file of the table data",
      disableScrolling: true,
      placement: "top"
    },
    {
      target: "#graphs",
      content: "These are the graphs corresponding to the rate table",
      placement: "top",
      locale: { last: "Close" }
    }
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
    const { action, index, /*lifecycle,*/ type, status } = data;
    console.log(data);

    if (action === "reset" || action === "close" || status === "finished") {
      setJoyrideState(prevState => ({
        ...prevState,
        run: false,
        stepIndex: 0,
        tourActive: false
      }))
    } else if (type === "step:after") {
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
        disableOverlayClose
        spotlightClicks
        hideBackButton
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
      <RateTable rateData={rateData} visible={visibility}></RateTable>
      <GraphPage substrateData={substrateData} visible={visibility}></GraphPage>
      <Footer></Footer>
    </div>
  )
}

export default App