
function LandingPage() {
    const click = () => {
        console.log("You clicked!")
    }
    return (
        <div className='flex justify-center w-screen h-[846px] bg-landing-page'>
            <div className="flex flex-col w-[1173px]">
                <div className="flex my-14 h-[60.57px] w-[334.24px]">
                    <img src='./src/assets/d2dlogo.png' className='w-[153.24px] mr-[38px] ml-4'></img>                   
                    <p className='font-semibold font-inter self-center text-[22.89px]/[29.76px]'>Design2Data</p>
                </div>
                <div className="flex flex-col justify-between w-[1173px] bg-white rounded-3xl py-[163px] px-[328px]">
                    <h1 className="text-grays-700 mb-[54px]">ENZYME RATE CALCULATOR</h1>
                    <div className="flex justify-between items-center h-[67px] rounded-[40px] mb-[36px] border-2 border-grays-400 p-[4px]">
                        <input className="grow pl-[20px] font-manrope font-medium text-lg placeholder-grays-600 focus:outline-none" placeholder='Paste URL'></input>
                        <button onClick={click} className="bg-secondary-500 px-[20px] mx-[6px] h-[47px] rounded-[30px] text-white text-lg font-semibold font-manrope">Calculate</button>
                    </div>
                    <div className="flex justify-center">
                        <a className="underline text-grays-700 font-manrope font-medium text-[18px] pr-[24px]" href="https://www.youtube.com/">How it works - A Video Tutorial</a>
                        <img src="./src/assets/purpleButton.svg"></img>
                    </div>                   
                </div>
            </div>
        </div>
        
    )
}

export default LandingPage;