import React from 'react';

class Weather extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      weather: false,
      input: '',
      error: '',
      city: ''
    }
  }

  updateWeather = (city) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c25f3c202404d3738117f9c16f15bb2e&lang=pl&units=metric`;

    fetch(url).then(resp => {
      return resp.json();
    }).then(data => {
      if (data.name === undefined) { // if server response has no city name = wrong city
        this.setState({error: 'Nie można znaleźć tego miasta'})
      } else {
        return this.setState({
          weather: data,
          error: '',
          city: city,
          input: ''
        }, () => this.saveCityToLocalStorage()); // after updating city in state, city is saved to local storage
      }
    }).catch(err => console.log(err));
  }

  componentWillMount() {
    let city = JSON.parse(localStorage.getItem('city')) || 'Wrocław';
    this.updateWeather(city);
    this.setState({
      city: city
    }, () => {
      setInterval(() => {
      this.updateWeather(this.state.city);
      }, 900000)} // weather update every 15 minutes
    )
  }

  handleInput = (event) => {
    this.setState({
      input: event.target.value
    })
  }

  handleEnterKey = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.updateWeather(this.state.input);
    }
  }

  handleClick = () => {
    this.updateWeather(this.state.input);
  }

  saveCityToLocalStorage() {
    localStorage.setItem('city', JSON.stringify(this.state.city));
  }

  render(){
    let object = this.state.weather;
    if (object) {
      let temp = Math.round(object.main.temp);
      let pressure = Math.round(object.main.pressure);
      let speed = Math.round(object.wind.speed);
      return (
        <div className='weather'>
          <div className={this.state.error == '' ? 'noerror' : 'error'}>{this.state.error}</div>
          <h2>{object.name}</h2>
          <div className='icon' style={{
              background: `url(./dist/icons/${object.weather[0].icon}.png)`,
            }}>
          </div>
          <div className='data'>
            <h2>{object.weather[0].description}</h2>
            <h3>Temperatura: {temp}&#176;C </h3>
            <h3>Ciśnienie: {pressure} hPa</h3>
            <h3>Wiatr: {speed} m/s</h3>
          </div>
          <div className='form'>
            <input
              type='text'
              placeholder='Wpisz miasto'
              onChange={this.handleInput}
              value={this.state.input}
              onKeyPress={e => this.handleEnterKey(e)}/>
            <div className='button-add' onClick={this.handleClick}>Pokaż</div>
          </div>
        </div>
      )
    } else {
      return null;
    }
  }
}

export default Weather
