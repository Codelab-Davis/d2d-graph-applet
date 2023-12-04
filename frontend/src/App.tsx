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
      content: (
        <div>
          <img src='./src/assets/urlInstruction1.png'></img>
          <p>Open your Google sheet and click Share.</p>
        </div>
      ),
      disableBeacon: true,
      disableScrolling: true,
      spotlightClicks: false,
      spotlightPadding: 0,
      // styles: {
      //   options: {
      //     spotlightShadow: '3 3 2px rgba(100, 0, 0, 0.5)'
      //   }
      // }
    },
    {
      target: "#url-input",
      content: (
        <div>
          <img src='./src/assets/urlInstruction2.png'></img>
          <p>Click the copy link button/link icon, then paste the link here.</p>
        </div>
      ),
      disableBeacon: true,
      disableScrolling: true,
      spotlightPadding: 0
    },
    {
      target: "#calculate-button",
      content: "After pasting the link, click next, then click calculate!",
      disableScrolling: true,
      spotlightClicks: false,
      spotlightPadding: 8
    },
    {
      target: "#rate-table",
      content: "Here is the enzyme reaction rate data, organized by samples.",
      placement: "top"
    },
    {
      target: "#rate-table-info",
      content: "You can hover over this icon for more information on the table."
    },
    {
      target: "#export-button",
      content: "Use this button to download a csv file of the table data",
      disableScrolling: true,
      placement: "top"
    },
    {
      target: "#graphs",
      content: (
        <div>
          <img src='./src/assets/graphInfo.png'></img>
          <p> These are the graphs corresponding to the rate table. You can view the slopes for each sample. </p>
        </div>
      ),
      placement: "top",
    },
    {
      target: "#graph-table-info",
      content: "You can hover over this icon for more information on the graphs.",
      locale: { last: "Exit Tour" }
    },
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
      if (index === 2) {
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
        floaterProps={{
          disableFlip: true
        }}
        styles={{
          options: {
            primaryColor: "#d66c0f",
            textColor: "#252525"
          }
        }}
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