import React from 'react';
import ReactDOM from 'react-dom';
import FlipMove from 'react-flip-move';
import Slider from 'react-slick';

let counterName = 0,
    counterDone = 0,
    counterUrgent = 0;

class ToDoList extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      list: [],
      input: '',
      inputError: false,
      checkbox: false,
      fullError: false,
      imageNumber: 221,
      weather: ''
    }
  }

  componentWillMount() {
    let list = JSON.parse(localStorage.getItem('list')) || [];
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${this.props.city}&appid=e79ae7fdae604a770d5aad5b8daea200`;

    console.log(url);

    this.setState({
      list: list
    });

    fetch(url).then(resp => {
                  return resp.json();
             }).then(data => {
                  return this.setState({weather: data.coord.lon})
             }).catch(err => console.log(err))
               // this.setState({weather: "Takiego miasta nie umiem znaleźć...";
  }

  componentDidUpdate() {
    let list = this.state.list;
    localStorage.setItem('list', JSON.stringify(list));
  }

  listSort = (key, counter) => {
    let list = this.state.list;
    if (counter % 2 === 0) {
      list.sort((a, b) => {
        if (a[key] < b[key]) return -1;
        if (a[key] > b[key]) return 1;
        return 0;
      })
    } else {
      list.sort((b, a) => {
        if (a[key] < b[key]) return -1;
        if (a[key] > b[key]) return 1;
        return 0;
      })
    }
    this.setState({
      list: list
    })
  }

  handleInput = (event) => {
    this.setState({
      input: event.target.value
    })
  }

  handleClickAdd = () => {
    let list = this.state.list;

    if (list.length === 8) {
      console.log('full!');
      this.setState({
        fullError: true
      })
    } else {

      if (this.state.input.length < 4 || this.state.input.length > 50) {
        this.setState({
          inputError: true
        })
      } else {
        let checkbox = this.state.checkbox;

        if (checkbox) {
          checkbox = 'urgent';
        } else {
          checkbox = '';
        }

        let newTask = {
          name: this.state.input,
          done: '',
          id: Date.now(),
          urgent: checkbox
        };

        list.push(newTask);

        this.setState({
          list: list,
          input: '',
          inputError: false,
          checkbox: false
        })
      }
    }
  }

  handleClickDone = (taskId) => {
    let list = this.state.list;
    list.find((object, index) => {
        if (object.id == taskId) {
          if (list[index].done === '') {
            list[index].done = 'done';
            return true; // stop searching
          } else {
            list[index].done = '';
            return true; // stop searching
          }
        }
    });

    this.setState({
      list: list
    })
  }

  handleClickDelete = (taskId) => {
    let list = this.state.list;
    list.find((object, index) => {
        if (object.id == taskId) {
          list.splice(index, 1);
          return true; // stop searching
        }
    });

    this.setState({
      list: list
    })
  }

  handleCheckBox = (taskId) => {
    let list = this.state.list;
    list.find((object, index) => {
        if (object.id == taskId) {
          if (list[index].urgent === '') {
            list[index].urgent = 'urgent';
            return true; // stop searching
          } else {
            list[index].urgent = '';
            return true; // stop searching
          }
        }
    });

    this.setState({
      list: list
    })
  }

  handleSortTitle = () => {
    counterName++;
    this.listSort('name', counterName);
  }

  handleSortDone = () => {
    counterDone++;
    this.listSort('done', counterDone);
  }

  handleSortUrgent = () => {
    counterUrgent++;
    this.listSort('urgent', counterUrgent);
  }

  checkboxClassToggle = () => {
    let checkbox = this.state.checkbox;
    if (checkbox) {
      checkbox = false;
    } else {
      checkbox = true;
    }
    this.setState({
      checkbox: checkbox
    })
  }

  handleBackgroundChange = () => {
    let counter = this.state.imageNumber;
    counter++;
    counter === 226 ? counter = 221 : false;
    this.setState({
      imageNumber: counter
    })
  }

  handleEnterKey = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.handleClickAdd();
    }
  }

  render(){
    return (
      <div className='main' style={{
        background: `url(../../dist/${this.state.imageNumber}.jpg) right center / cover no-repeat fixed`
      }}>
        <div className='phone'>
          <div className='lefthand'>

            <ul>
              <li>
                <div className='content'>
                  <AddTaskBar
                    inputText={this.handleInput}
                    addTask={this.handleClickAdd}
                    input={this.state.input}
                    classToggle={this.checkboxClassToggle}
                    checkbox={this.state.checkbox}
                    enterKeyPress={this.handleEnterKey}
                    inputError={this.state.inputError}/>
                  <SortButtons
                    list={this.state.list}
                    sortByTitle={this.handleSortTitle}
                    sortByDone={this.handleSortDone}
                    sortByUrgent={this.handleSortUrgent}
                    backgroundChange={this.handleBackgroundChange}/>
                </div>
              </li>
              <li>
                <div className='content'>
                  <AddTaskBar
                    inputText={this.handleInput}
                    addTask={this.handleClickAdd}
                    input={this.state.input}
                    classToggle={this.checkboxClassToggle}
                    checkbox={this.state.checkbox}
                    enterKeyPress={this.handleEnterKey}
                    inputError={this.state.inputError}/>
                  <SortButtons
                    list={this.state.list}
                    sortByTitle={this.handleSortTitle}
                    sortByDone={this.handleSortDone}
                    sortByUrgent={this.handleSortUrgent}
                    backgroundChange={this.handleBackgroundChange}/>
                </div>
              </li>
            </ul>

          </div>
        </div>
          <div className='paper'>
            <div className='content'>
              <h2>Lista zadań</h2>
              <ul>
                <FlipMove duration={500} easing="ease-out">
                  {
                    this.state.list.map(elem => {
                      return <SingleTask
                        task={elem}
                        key={elem.id}
                        clickDone={this.handleClickDone}
                        clickUrgent={this.handleCheckBox}
                        clickDelete={this.handleClickDelete}/>
                    })
                  }
                </FlipMove>
              </ul>
            </div>
          </div>
        </div>
      )
    }
  }

class AddTaskBar extends React.Component{
  render(){

    let spanClass = 'wrong';
    if (this.props.input.length < 4 || this.props.input.length > 50) {
      spanClass = 'wrong';
    } else {
      spanClass = 'right';
    }

    let errorClass = '';
    if (this.props.inputError) {
      errorClass = "error";
    } else {
      errorClass = "noerror";
    }

    return (
      <div className='task-add'>
        <form>
          <div className='form-inside'>
            <div className={errorClass}>Zadanie musi mieć od 4 do 50 znaków.</div>
            <span className={spanClass}>{this.props.input.length}</span>
            <h2>nowe zadanie:</h2>
            <input
              type='text'
              onChange={this.props.inputText}
              value={this.props.input}
              onKeyPress={e => this.props.enterKeyPress(e)}/>
            <h2>ważne?</h2>
            <div
              onClick={this.props.classToggle}
              className={this.props.checkbox ? 'checked' : 'unchecked'}>
              <div className='tick'></div>
            </div>
            <div className='buttonAdd'
              onClick={this.props.addTask}>
              Dodaj</div>
          </div>
        </form>
      </div>
    )
  }
}

class SingleTask extends React.Component{

  render(){

  let task = this.props.task;

    return (
      <li key={task.id} className={`${task.done} ${task.urgent}`}>
        <h3 className='button-done' onClick={()=>this.props.clickDone(task.id)}>- {task.name}</h3>
        <div className='buttons'>
          <h5 className='button-urgent' onClick={()=>this.props.clickUrgent(task.id)}>ważne!</h5>
          <h5 className='button-delete' onClick={()=>this.props.clickDelete(task.id)}>usuń</h5>
        </div>
      </li>
    )
  }
}

class SortButtons extends React.Component{
  render(){

    if (this.props.list.length > 1) {
      return (
        <div>
          <div className='sort-buttons'>
            <h3>Sortuj zadania:</h3>
            <div className='buttonRegural' onClick={this.props.sortByTitle} >Nazwa</div>
            <div className='buttonRegural' onClick={this.props.sortByDone} >Wykonane</div>
            <div className='buttonRegural' onClick={this.props.sortByUrgent} >Ważne</div>
          </div>
          <div className='secretButtons'>
            <div className='secretOne' onClick={this.props.slide} ></div>
            <div className='secretTwo' onClick={this.props.backgroundChange} ></div>
          </div>
        </div>
      )
    } else {
      return null
    }
  }
}

class SimpleSlider extends React.Component {
  render(){

      var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      }
      return (
        <Slider {...settings}>
          <li><img src='../../dist/221.jpg' /></li>
          <li><img src='../../dist/222.jpg' /></li>
          <li><img src='../../dist/223.jpg' /></li>
        </Slider>
      );
    }
  }

class App extends React.Component{
  render(){
    return (
      <div>
        <ToDoList city="Wroclaw"/>
      </div>
    )

  }
}

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <App />,
        document.getElementById('app')
    );
});
