require('../scss/main.scss')
import React from 'react';
import ReactDOM from 'react-dom';

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

    if (list.length === 100) {
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
      <div>
        <AddTaskBar
          inputText={this.handleInput}
          addTask={this.handleClickAdd}
          input={this.state.input}
          classToggle={this.checkboxClassToggle}
          checkbox={this.state.checkbox}/>
        <TableHead
          list={this.state.list}
          sortByTitle={this.handleSortTitle}
          sortByDone={this.handleSortDone}
          sortByUrgent={this.handleSortUrgent}/>
        <div>{this.state.input}</div>
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
    )
  }
}

class AddTaskBar extends React.Component{
  render(){
    let buttonStyle = {
      margin: '10px 0',
      width: '175px',
      height: '50px',
      backgroundColor: 'grey',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontWeight: 700,
      fontSize: '24px',
      textTransform: 'uppercase',
      cursor: 'pointer'
    }

    return (
      <div>
        <form>
          <h2>New task:</h2>
          <input
            type='text'
            onChange={this.props.inputText}
            value={this.props.input}/>
          <div
            style={buttonStyle}
            onClick={this.props.addTask}>
            Dodaj</div>
          <div
            style={{width: '20px', height: '20px', backgroundColor: 'grey', cursor: 'pointer'}}
            onClick={this.props.classToggle}
            className={this.props.checkbox ? 'checked' : 'unchecked'}>
            X</div>
        </form>
      </div>
    )
  }
}

class SingleTask extends React.Component{

  render(){
    let buttonStyle = {
      border: '1px solid black',
      width: '100px',
      cursor: 'pointer',
      height: '20px',
      margin: '10px'
    };
    let liStyle = {
      display: 'flex',
      alignItems: 'center'
    }

  let task = this.props.task;

    return (
      <li style={liStyle} key={task.id} className={`${task.done} ${task.urgent}`}>
        <h3>{task.name}</h3>
        <div onClick={()=>this.props.clickDone(task.id)} style={buttonStyle}>Wykonane</div>
        <div onClick={()=>this.props.clickDelete(task.id)} style={buttonStyle}>Usuń</div>
        <div style={{width: '20px', height: '20px', backgroundColor: 'grey', cursor: 'pointer'}} onClick={()=>this.props.clickUrgent(task.id)}>X</div>
      </li>
    )
  }
}

class TableHead extends React.Component{
  render(){
    let spanStyle = {
      margin: '10px 10px',
      border: '1px solid black',
      padding: '10px',
      cursor: 'pointer'
    }

    if (this.props.list.length !== 0) {
      return (
        <div>
          <div onClick={this.props.sortByTitle} style={spanStyle}>Title</div>
          <div onClick={this.props.sortByDone} style={spanStyle}>Wykonane</div>
          <div onClick={this.props.sortByUrgent} style={spanStyle}>Ważne</div>
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

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <App />,
        document.getElementById('app')
    );
});

// contentEditable
