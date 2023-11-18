import { useState } from 'react';

import './App.css';
import LandingPage from './LandingPage';
import RateTable from './RateTable';
import Footer from './Footer';

function App() {

  return (
    <div className="bg-[#f7fcff]">
      <LandingPage></LandingPage>
      <RateTable></RateTable> 
      <Footer></Footer>
    </div>
  )
}

export default App