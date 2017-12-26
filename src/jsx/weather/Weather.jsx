import React from 'react';

class Weather extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      weather: false
    }
  }

  updateWeather = () => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=Katowice&appid=c25f3c202404d3738117f9c16f15bb2e&lang=pl&units=metric`;

    fetch(url).then(resp => {
      return resp.json();
    }).then(data => {
      return this.setState({weather: data});
    }).catch(err => console.log(err))
    // this.setState({weather: "Takiego miasta nie umiem znaleźć..."});
  }

  componentWillMount() {
    this.updateWeather();
      setInterval(() => {
        this.updateWeather();
      }, 900000); // 15 minutes weather update
  }

  render(){
    if (this.state.weather) {
      let object = this.state.weather;
      let temp = Math.round(this.state.weather.main.temp);
      return (
        <div className='weather'>
          <div className='icon' style={{
              background: `url(./dist/icons/${object.weather[0].icon}.png)`,
            }}>
          </div>
          <div className='data'>
            <h2>{object.weather[0].description}</h2>
            <h3>Temp: {temp}&#176;C </h3>
            <h3>Ciśnienie: {object.main.pressure}hPa</h3>
            <h3>Wiatr: {object.wind.speed}m/s</h3>
          </div>
        </div>
      )
    } else {
      return (
        <div className='weather'>
          <h3 className='icon'>Nie udało się załadować pogody :(</h3>
        </div>
      )
    }
  }
}

export default Weather
