import { useState, useRef } from 'react';

import './App.css';
import LandingPage from './LandingPage';
import RateTable from './RateTable';
import GraphPage from './GraphPage';
import Footer from './Footer';
import { JoyrideState } from './Types';
import Joyride, { Step, CallBackProps, TooltipRenderProps } from 'react-joyride';

function App() {
  const steps: Step[] = [
    {
      target: "#url-input",
      content: (
        <div>
          <div className="flex justify-center">
            <img className="mb-[3%] w-[35%]" src='/assets/urlInstruction1.png'></img>
          </div>
          <p>Open your Google sheet and click Share.</p>
        </div>
      ),
      placement: "top",
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
          <div className="flex justify-center">
            <img className="mb-[3%] w-[35%]" src='/assets/urlInstruction2.png'></img>
          </div>
          <p>Click the copy link button/link icon, then paste the link here.</p>
        </div>
      ),
      placement: "top",
      disableBeacon: true,
      disableScrolling: true,
      spotlightPadding: 0
    },
    {
      target: "#calculate-button",
      content: "After pasting the link, click next, then click calculate!",
      placement: "top",
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
      content: "You can hover over this icon for more information on the table.",
      disableScrolling: true,
    },
    {
      target: "#export-button",
      content: "Use this button to download a csv file of the table data.",
      disableScrolling: true,
      // placement: "top"
    },
    {
      target: "#graphs",
      content: (
        <div>
          <img src='/assets/graphInfo.png'></img>
          <br/>
          <p> These are the graphs corresponding to the rate table. You can view the slopes for each sample. </p>
        </div>
      ),
      placement: "top",
    },
    {
      target: "#graph-table-info",
      content: "You can hover over this icon for more information on the graphs.",
      disableScrolling: true,
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

  const rateTableRef = useRef(null);

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

  // Need to set up background, text, etc to be normal
  function CustomTooltip({
    closeProps,
    index,
    primaryProps,
    step,
    tooltipProps
  }: TooltipRenderProps) {
    return (
      <div {...tooltipProps} className='flex flex-col justify-center max-w-[350px] bg-white dark:bg-grays-700 p-[10px] rounded-[10px]'>
        <div className='flex flex-col items-end'>
          <button {...closeProps}><img src="/assets/closeButton.svg"/></button>
        </div>
        <div className='dark:text-white text-center text-[16px]'>
          {step.content}
        </div>
        <div className='flex flex-col items-end'>
          <button {...primaryProps} className="mt-[3%] px-[6px] py-[4px] bg-secondary-600 hover:bg-secondary-700 rounded-[5px] text-[16px] text-white">
            {index === 7
              ? "Exit Tour"
              : "Next"
            }
          </button>

        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#fdfdfd] dark:bg-grays-700">
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
            textColor: "#252525",
            arrowColor: (window.matchMedia("(prefers-color-scheme:dark)").matches ? "#2f2f2f" : "#ffffff")
          }
        }}
        tooltipComponent={CustomTooltip}
      />

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

      <Footer></Footer>
    </div>
  )
}

export default App
