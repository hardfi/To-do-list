import React from 'react';

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

export default SingleTask
