function LandingPage() {
    const click = () => {
        console.log("You clicked!")
    }
    return (
        <div className='flex justify-center items-center h-screen bg-contain bg-center bg-landing-page'>
            <div className="flex self-center flex-col w-[70%]">
                <div className="flex my-14 h-fit w-fit justify-start">
                    <img src='./src/assets/d2dlogo.png' className='w-[153.24px] ml-6'></img>                   
                    {/*<p className='font-semibold font-inter self-center text-[22.89px]/[29.76px]'>Design2Data</p>*/}
                </div>
                <div className="flex flex-col items-center justify-between bg-white rounded-3xl py-[163px] mb-44">
                    <h1 className="text-grays-700 mb-[54px]">ENZYME RATE CALCULATOR</h1>
                    <div className="flex justify-between items-center h-[67px] w-[516px] rounded-[40px] mb-[36px] border-2 border-grays-400 p-[4px]">
                        <input className="grow pl-[20px] font-manrope font-medium text-lg placeholder-grays-600 focus:outline-none" placeholder='Paste URL'></input>
                        <button onClick={click} className="bg-secondary-500 px-[20px] mx-[6px] h-[47px] rounded-[30px] text-white text-lg font-semibold font-manrope">Calculate</button>
                    </div>
                    <div className="flex justify-center gap-2">
                        <a className="underline text-grays-700 font-manrope font-medium text-[18px]" href="https://www.youtube.com/">How it works</a>
                        <img src="./src/assets/orangeButton.svg"></img>
                    </div>                   
                </div>
            </div>
        </div>
        
    )
}

export default LandingPage;