import React from 'react';
import ReactDOM from 'react-dom';
import FlipMove from 'react-flip-move';
import Weather from './Weather/Weather.jsx'
import SingleTask from './Task/Task.jsx'
import AddTaskBar from './AddTask/AddTask.jsx'
import SecretButtons from './SecretButtons/SecretButtons.jsx'
import SortButtons from './SortButtons/SortButtons.jsx'

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
      phoneScreen: 'screen1'
    }
  }

  componentWillMount() {
    let list = JSON.parse(localStorage.getItem('list')) || [
      {name: "Cześć! Chcesz zobaczyć jak to działa?", done: "", id: 1514117485653, urgent: "urgent"},
      {name: "Mam dla Ciebie zadania do wykonania:", done: "", id: 1514117511899, urgent: ""},
      {name: "Dodaj lub usuń jakieś zadanie", done: "", id: 1514117530120, urgent: ""},
      {name: "Oznacz zadanie jako ważne", done: "", id: 1514117542053, urgent: ""},
      {name: "Posortuj zadania", done: "", id: 1514117548187, urgent: ""},
      {name: "Pobaw się telefonem i odkryj ukryte funkcje! :)", done: "", id: 1514117720590, urgent: "urgent"}
    ];

    this.setState({
      list: list
    });
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

    if (list.length === 7) {
      console.log('full!');
      this.setState({
        fullError: true
      })
    } else {

      if (this.state.input.length < 4 || this.state.input.length > 60) {
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

  handleScreenSlide = () => {
    let phoneScreen = this.state.phoneScreen;
    if (phoneScreen === 'screen1') {
      phoneScreen = 'screen2';
    } else {
      phoneScreen = 'screen1';
    }
    this.setState({
      phoneScreen: phoneScreen
    })
  }

  render(){
    return (
      <div className='main' style={{
        background: `url(./dist/img/${this.state.imageNumber}.jpg) right center / cover no-repeat fixed`
      }}>
        <div className='phone'>
          <ul>
            <li className={`${this.state.phoneScreen}`}>
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
            <li className={`${this.state.phoneScreen}`}>
              <Weather />
            </li>
          </ul>
          <SecretButtons
            backgroundChange={this.handleBackgroundChange}
            slide={this.handleScreenSlide}/>
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

class App extends React.Component{
  render(){
    return (
      <div>
        <ToDoList />
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
