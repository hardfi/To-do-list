import React from 'react';

class AddTaskBar extends React.Component{
  render(){

    let spanClass = 'wrong';
    if (this.props.input.length < 4 || this.props.input.length > 60) {
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
      <div className='form-inside'>
        <div className={errorClass}>Zadanie musi mieć od 4 do 60 znaków.</div>
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
        </div>
        <div className='button-add'
          onClick={this.props.addTask}>
          Dodaj</div>
      </div>
    )
  }
}

export default AddTaskBar
