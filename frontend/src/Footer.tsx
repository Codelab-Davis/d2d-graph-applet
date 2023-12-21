const Footer = () => {
    return (
      <>
        <footer className="dark:bg-grays-600 rounded-t-[35px]">
          <div className="mx-auto w-[95%] p-4 py-6 lg:py-8">
            <div className="md:flex md:justify-between">
              <div className="mb-6 md:mb-0">
                <a href="https://d2d.ucdavis.edu/" className="flex sm:mx-auto items-center">
                  <img src='/assets/d2dlogo.png' className='object-contain ml-1 mt-1 mb-[13px] w-[140px] min-[1450px]:w-[160px] min-[1650px]:w-[180px]'></img>
                </a>
                <span className="self-center ml-1 text-2xl whitespace-nowrap dark:text-white font-semibold">Enzyme Rate Calculator</span>
              </div>
              <div className="flex-col flex mt-4 sm:justify-center sm:mt-0 items-center space-y-4 md:space-y-0 md:flex-row md:space-x-8 justify-end">
                <div className="flex-col flex mt-4 sm:justify-center sm:mt-0 items-center space-y-4 md:space-y-0 md:flex-row md:space-x-8 justify-end">
                <a href="/public/Operating_Manual.pdf" target = "_blank" className="flex items-center">
                  <button type="button" className="text-white bg-secondary-600 hover:bg-secondary-700 font-semibold rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-secondary-600 dark:hover:bg-secondary-600 dark:focus:secondary-600">DOCUMENTATION</button>
                  </a>
                  <a href="https://fpgojzvzwng.typeform.com/to/wegBSZep" className="flex items-center">
                  <button type="button" className="py-2.5 px-5 me-2 mb-2 text-base font-semibold text-gray-900 bg-white rounded-full border border-grays-300 hover:bg-grays-300 focus:z-10 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-secondary-600">Feedback form</button>
                </a>
                </div>
              </div>
            </div>
            <div className="mt-[56px] mb-[16px] w-fill h-[1px] rounded-[2px] bg-grays-400"/>
            <div className="sm:flex sm:items-center sm:justify-between">
              <div className="flex gap-2 justify-center justify-items-center items-center">
                <span className="text-sm text-gray-500 sm:text-center dark:text-white">
                  Made with
                </span>
                <img src="/assets/coffee.svg"/>
                <span className="text-sm text-gray-500 sm:text-center dark:text-white">
                  by
                </span>
                <div className="w-[92px] h-[17px] bg-contain bg-no-repeat bg-[url('/assets/codelabLogo.svg')] dark:bg-[url('/assets/codelabLogoWhite.svg')] dark:h-[24px] dark:bg-cover"></div>
              </div>
              <div className="flex gap-3 lg:gap-[40px] mt-4 sm:justify-center sm:mt-0">
                <a href="https://d2d.ucdavis.edu/contact-us" target="_blank" className="hover:underline text-grays-700 dark:text-[#f2f2f2]" >Contact Us</a>
                <a href="https://d2d.ucdavis.edu/" target="_blank" className="hover:underline text-grays-700 dark:text-[#f2f2f2]">About D2D</a>
                <a href="https://www.d2dcure.com/" target="_blank" className="hover:underline text-grays-700 dark:text-[#f2f2f2]">D2D Database</a>
                <a href="https://medium.com/@mohnish.gopi/d2d-enzyme-rate-calculator-c1cc87f268f4" target="_blank" className="hover:underline text-grays-700 dark:text-[#f2f2f2]">Behind the Scenes</a>
              </div>
            </div>
          </div>
        </footer>
      </>
    );
  };
  export default Footer;
  