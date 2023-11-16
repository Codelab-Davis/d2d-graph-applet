import { useState } from 'react';

import './App.css';
import LandingPage from './LandingPage';
import RateTable from './RateTable';

function App() {

  return (
    <div className="bg-[#f7fcff]">
      <LandingPage></LandingPage>
      <RateTable></RateTable> 
    </div>
  )
}

export default App