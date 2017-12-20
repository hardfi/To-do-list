import React from 'react';
import ReactDOM from 'react-dom';
//import '../scss/main.scss';

let list = [
  {name: 'Kupić mleko', done: 'done', id: 2, urgent: 'urgent'},
  {name: 'Nauczyć się Reacta', done: '', id: 4, urgent: ''},
  {name: 'Zrobić pranie', done: 'done', id: 3, urgent: 'urgent'},
  {name: 'Ale śniadanie', done: '', id: 1, urgent: ''},
];
let counterName = 0,
    counterDone = 0,
    counterUrgent = 0;

class ToDoList extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      list: this.props.list,
      input: '',
      inputError: false,
      checkbox: false,
      fullError: false
    }
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

    if (list.length === 20) {
      console.log('full!');
      this.setState({
        fullError: true
      })
    } else {

      if (this.state.input.length < 3 || this.state.input.length > 50) {
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
          checkbox: checkbox
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

  handleEdit = (taskId) => {

  }

  render(){
    return (
      <div className='main'>
        <div className='phone'>
          <div className='lefthand'>
            <div className='content'>
              <AddTaskBar
                inputText={this.handleInput}
                addTask={this.handleClickAdd}
                input={this.state.input}
                classToggle={this.checkboxClassToggle}
                checkbox={this.state.checkbox}/>
              <SortButtons
                list={this.state.list}
                sortByTitle={this.handleSortTitle}
                sortByDone={this.handleSortDone}
                sortByUrgent={this.handleSortUrgent}/>
            </div>
          </div>
        </div>
          <div className='paper'>
            <div className='content'>
              <h2>Lista zadań</h2>
              <ul>
                {
                  this.state.list.map(elem => {
                    return <SingleTask
                      task={elem}
                      key={elem.id}
                      clickDone={this.handleClickDone}
                      clickUrgent={this.handleCheckBox}
                      clickDelete={this.handleClickDelete}
                      edit={this.handleEdit}/>
                  })
                }
              </ul>
            </div>
        </div>
      </div>
    )
  }
}

class AddTaskBar extends React.Component{
  render(){
    return (
      <div className='task-add'>
        <form>
          <div className='form-inside'>
            <h2>nowe zadanie:</h2>
            <input
              type='text'
              onChange={this.props.inputText}
              value={this.props.input}/>
            <h2>Pilne?</h2>
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

    if (this.props.list.length !== 0) {
      return (
        <div className='sort-buttons'>
          <h3>Sortuj zadania:</h3>
          <div onClick={this.props.sortByTitle} >Nazwa</div>
          <div onClick={this.props.sortByDone} >Wykonane</div>
          <div onClick={this.props.sortByUrgent} >Ważne</div>
        </div>
      )
    } else {
      return null
    }
  }
}

class App extends React.Component{
  render(){
    return <ToDoList list={list} />
  }
}

class ChangeBackground extends React.Component{
  render(){
    let counter = 222;
  //  let image = `../../dist/${counter}.jpeg`;
    console.log(counter);
    return (
      <div>em</div>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <App />,
        document.getElementById('app')
    );
});

// contentEditable
