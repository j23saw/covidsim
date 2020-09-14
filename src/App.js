import React from 'react';
import './App.css';
import SimWindow from './SimWindow';

function App() {
  return (
    <div className="App">
      <div className="title">
        <h1>
          CovidSim
        </h1>
      </div>
      <div className = "SimWindow">
        <SimWindow /> 
      </div>
    </div>
  );
}

export default App;
