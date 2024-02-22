import Joyride, { Step, CallBackProps, TooltipRenderProps } from 'react-joyride';
import { JoyrideState } from './Types';
import { useEffect } from 'react';

function Walkthrough(props: { joyrideState: JoyrideState, setJoyrideState: React.Dispatch<React.SetStateAction<JoyrideState>> }) {
  // Steps for the walkthrough, with specific settings for each step
  // Note: some functionality is linked to the order of steps with hardcoded indices
  const steps: Step[] = [
    {
      target: "#url-input",
      content: (
        <div>
          <div className="flex justify-center">
            <img className="flex justify-center mb-[3%] w-[35%]" src='/assets/urlInstruction1.png'></img>
          </div>
          <p>Open your Google sheet and click Share.</p>
        </div>
      ),
      placement: "top",
      disableBeacon: true,
      disableScrolling: true,
      spotlightClicks: false,
      spotlightPadding: 0
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
    },
    {
      target: "#graphs",
      content: (
        <div>
          <div className="flex justify-center">
            <img src='/assets/graphInfo.png' className="mb-[3%]"></img>
          </div>
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

  // Handles walkthrough actions (ie. close, next) based on step index
  // Note: step indices are hardcoded based on order of steps above
  const handleCallback = (data: CallBackProps) => {
    const { action, index, type, status } = data;

    if (action === "reset" || action === "close" || status === "finished") {
      // End and reset walkthrough
      props.setJoyrideState(prevState => ({
        ...prevState,
        run: false,
        stepIndex: 0,
        tourActive: false
      }))
    } else if (type === "step:after") {
      if (index === 2) {
        // Pause walkthrough until calculate button is pressed
        props.setJoyrideState(prevState => ({
          ...prevState,
          run: false
        }))
      } else {
        // Continue walkthrough normally
        props.setJoyrideState(prevState => ({
          ...prevState,
          stepIndex: prevState.stepIndex + 1
        }))
      }
    }
  }

  // Custom component for tooltip styling
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
          <button {...closeProps}><img src="/assets/closeButton.svg" /></button>
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

  // Initializes joyride state on load
  useEffect(() => {
    props.setJoyrideState(prevState => ({
    ...prevState,
    steps: steps
  }))}, [])

  return (
    <Joyride
      continuous
      disableOverlayClose
      spotlightClicks
      hideBackButton
      steps={steps}
      run={props.joyrideState.run}
      stepIndex={props.joyrideState.stepIndex}
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
  )
}

export default Walkthrough;