import React from 'react';

class Weather extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      weather: false
    }
  }

  componentWillMount() {
    let url = `http://api.openweathermap.org/data/2.5/weather?q=Katowice&appid=c25f3c202404d3738117f9c16f15bb2e&lang=pl&units=metric`;

    fetch(url).then(resp => {
      return resp.json();
    }).then(data => {
      return this.setState({weather: data});
    }).catch(err => console.log(err))
    // this.setState({weather: "Takiego miasta nie umiem znaleźć...";
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
      return null;
    }
  }
}

export default Weather

/*


{
  "coord": {
    "lon": 17.03,
    "lat": 51.1
  },
  "weather": [
    {
      "id": 803,
      "main": "Clouds",
      "description": "broken clouds",
      "icon": "04n"
    }
  ],
  "base": "stations",
  "main": {
    "temp": 278.15,
    "pressure": 1025,
    "humidity": 100,
    "temp_min": 278.15,
    "temp_max": 278.15
  },
  "visibility": 10000,
  "wind": {
    "speed": 6.7,
    "deg": 290
  },
  "clouds": {
    "all": 75
  },
  "dt": 1513870200,
  "sys": {
    "type": 1,
    "id": 5375,
    "message": 0.0052,
    "country": "PL",
    "sunrise": 1513839208,
    "sunset": 1513867637
  },
  "id": 3081368,
  "name": "Wroclaw",
  "cod": 200
}
*/
