import React from 'react';
import './App.css';
import SimWindow from './SimWindow';

function App() {
  return (
    <div className="App">
        <header>
          <div className = "navbar">
            <h1>CovidSim</h1>
            <nav>
              <ul>
                <li>
                  <a 
                  href = "https://github.com/j23saw/covidsim"
                  title = "View Source Code">
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"width="26" height="26"viewBox="0 0 172 172" style={{fill:"#000000;"}}><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style={{mixBlendMode: "normal"}}><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#bbe1fa"><path d="M78.11667,15.05c-32.96667,3.58333 -59.48333,30.1 -63.06667,62.35c-4.3,35.83333 17.91667,66.65 49.45,76.68333v-16.48333c0,0 -2.86667,0.71667 -6.45,0.71667c-10.03333,0 -14.33333,-8.6 -15.05,-13.61667c-0.71667,-2.86667 -2.15,-5.01667 -4.3,-7.16667c-2.15,-0.71667 -2.86667,-0.71667 -2.86667,-1.43333c0,-1.43333 2.15,-1.43333 2.86667,-1.43333c4.3,0 7.88333,5.01667 9.31667,7.16667c3.58333,5.73333 7.88333,7.16667 10.03333,7.16667c2.86667,0 5.01667,-0.71667 6.45,-1.43333c0.71667,-5.01667 2.86667,-10.03333 7.16667,-12.9c-16.48333,-3.58333 -28.66667,-12.9 -28.66667,-28.66667c0,-7.88333 3.58333,-15.76667 8.6,-21.5c-0.71667,-1.43333 -1.43333,-5.01667 -1.43333,-10.03333c0,-2.86667 0,-7.16667 2.15,-11.46667c0,0 10.03333,0 20.06667,9.31667c3.58333,-1.43333 8.6,-2.15 13.61667,-2.15c5.01667,0 10.03333,0.71667 14.33333,2.15c9.31667,-9.31667 20.06667,-9.31667 20.06667,-9.31667c1.43333,4.3 1.43333,8.6 1.43333,11.46667c0,5.73333 -0.71667,8.6 -1.43333,10.03333c5.01667,5.73333 8.6,12.9 8.6,21.5c0,15.76667 -12.18333,25.08333 -28.66667,28.66667c4.3,3.58333 7.16667,10.03333 7.16667,16.48333v23.65c29.38333,-9.31667 50.16667,-36.55 50.16667,-68.08333c0,-43 -36.55,-76.68333 -79.55,-71.66667z"></path></g></g></svg>                 
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </header>
      <div className = "SimWindow">
        <SimWindow /> 
      </div>
    </div>
  );
}

export default App;
