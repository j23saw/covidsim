import React, {Component} from "react"
import './Dashboard.css'
import P5Wrapper from "./P5Wrapper"

class SimWindow extends Component{
  constructor(props){
    super(props)
    this.state = {
      population: 10,
      infPercent: 1,
      speed: 0.5,
      minInfDist: 8
    }
  }
  
  handleChange = (e) => {
    const {id, value} = e.target
    this.setState({
      [id] : +value
    })
    //console.log(this.state.population)
  }

  render(){
    return(
      <div className="Dashboard">
        <P5Wrapper
          p5Props = {{
            pop: this.state.population,
            inf: this.state.infPercent,
            speed: this.state.speed,
            mid: this.state.minInfDist
          }}
        />
        <div>
          <div>
            <label for = "population">Population:</label><br></br>
            <input 
              type="range" 
              id= "population" 
              value={this.state.population} 
              min="1" 
              max="1000"
              onChange = {this.handleChange}
            />
          </div>
          <div>
            <label for = "infPercent">Infected Percentage:</label><br></br>
            <input 
              type="range" 
              id= "infPercent" 
              value={this.state.infPercent} 
              min="0.01" 
              max="10"
              onChange = {this.handleChange}
            />
          </div>
          <div>                        
            <label for = "speed">Speed:</label><br></br>
            <input 
              type="range" 
              id= "speed"
              value={this.state.speed} 
              min="0.1" 
              max="10"
              onChange = {this.handleChange}
            />
          </div>
          <div>                        
            <label for = "minInfDist">Minimum Infection Distance:</label><br></br>
            <input 
              type="range" 
              id= "minInfDist" 
              value={this.state.minInfDist} 
              min="0" 
              max="24"
              onChange = {this.handleChange}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default SimWindow

