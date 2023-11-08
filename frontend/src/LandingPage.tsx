import React, { Component, useState, useEffect }from 'react';

function LandingPage() {
    //"h-14 w-screen bg-gradient-to-t from-[#c7f2f6] to-[#ffffff]"
    //"url('./src/assets/backgroundLandingPage.png')"

    return (
        <div className="flex flex-col min-h-screen min-w-screen h-screen w-fit bg-gradient-to-t from-[#c7f2f696] to-[#ffffff96]]">
            <div className="flex my-14 h-[60.57px] w-[334.24px] justify-start">
                <img src='./src/assets/d2dlogo.png' className='w-[153.24px] mr-[38px]'></img>
                <div className='flex flex-col justify-center'>                    
                    <p className='font-semibold text-[22.89px]/[29.76px]'>Design2Data</p>
                </div>
            </div>
            <div className="flex flex-col h-[539px] w-[1173px] bg-white rounded-3xl py-[162px] px-[304px]">
                <p>ENZYME RATE CALCULATOR</p>
            </div>
        </div>
    )
}

export default LandingPage;