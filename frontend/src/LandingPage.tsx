function LandingPage() {
    const click = () => {
        console.log("You clicked!")
    }
    return (
        <div className='flex justify-center items-center bg-cover bg-center bg-landing-page h-screen'>
            <div className="flex flex-col self-center w-[70%]">
                <div className="flex justify-start my-14 h-fit w-fit">
                    <img src='./src/assets/d2dlogo.png' className='object-contain ml-6 w-[153px]'></img>
                </div>
                <div className="flex flex-col justify-between items-center mb-44 py-[163px] bg-white rounded-3xl">
                    <h1 className="mb-[54px] text-grays-700">ENZYME RATE CALCULATOR</h1>
                    <h3 className="mb-[10px] text-grays-700">Please insert a valid spreadsheet URL</h3>
                    <div className="flex justify-between items-center border-2  border-grays-400 mb-[36px] p-[4px] h-[67px] w-[516px] rounded-[40px]">
                        <input className="grow pl-[20px] font-manrope font-medium text-base placeholder-grays-600 focus:outline-none" placeholder='Paste URL'></input>
                        <button onClick={click} className="mx-[6px] px-[20px] h-[47px] bg-secondary-500 rounded-[30px] text-base font-semibold font-manrope text-white">Calculate</button>
                    </div>
                    <div className="flex justify-center gap-2">
                        <a className="text-base font-manrope font-medium underline text-grays-700" href="https://www.youtube.com/">How it works</a>
                        <img src="./src/assets/orangeButton.svg"></img>
                    </div>                   
                </div>
            </div>
        </div>
        
    )
}

export default LandingPage;