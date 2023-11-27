const Footer = () => {
    return (
      <>
        <footer className="dark:bg-gray-900">
          <div className="mx-auto w-[95%] p-4 py-6 lg:py-8">
            <div className="md:flex md:justify-between">
              <div className="mb-6 md:mb-0">
                <a href="https://d2d.ucdavis.edu/" className="flex sm:mx-auto items-center">
                  <img src='./src/assets/d2dlogo.png' className='object-contain ml-1 mt-1 w-[140px] min-[1450px]:w-[160px] min-[1650px]:w-[180px]'></img>
                </a>
                <span className="self-center ml-1 text-2xl whitespace-nowrap dark:black">Enzyme Rate Calculator</span>
              </div>
              <div className="flex-col flex mt-4 sm:justify-center sm:mt-0 items-center space-y-4 md:space-y-0 md:flex-row md:space-x-8 justify-end">
                <div className="flex-col flex mt-4 sm:justify-center sm:mt-0 items-center space-y-4 md:space-y-0 md:flex-row md:space-x-8 justify-end">
                <a href="https://d2d.ucdavis.edu/" className="flex items-center">
                  <button type="button" className="text-white bg-secondary-600 hover:bg-secondary-600 focus:outline-none focus:ring-4 focus:ring-secondary-600 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-secondary-600 dark:hover:bg-secondary-600 dark:focus:secondary-600">Documentation</button>
                  <button type="button" className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-grays-600 hover:bg-secondary-300 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-secondary-600 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-secondary-600">Demo</button>
                </a>
                </div>
              </div>
            </div>
            <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
            <div className="sm:flex sm:items-center sm:justify-between">
              <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                Made with ☕ By CodeLab
              </span>
              <div className="flex mt-4 sm:justify-center sm:mt-0">
                <a href="https://d2d.ucdavis.edu/" className="hover:underline text-grays-700 mr-3" >Contact Us</a>
                <a href="#" className="hover:underline text-grays-700 mr-3">About D2D</a>
                <a href="#" className="hover:underline text-grays-700 mr-3">Privacy Policy</a>
                <a href="#" className="hover:underline text-grays-700 mr-3">Terms of Service</a>
                <a href="#" className="hover:underline text-grays-700 mr-3">Cookies</a>
              </div>
            </div>
          </div>
        </footer>
      </>
    );
  };
  export default Footer;
  