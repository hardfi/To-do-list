import React from 'react';

class SortButtons extends React.Component{
  render(){

    if (this.props.list.length > 1) {
      return (
        <div className='sort-buttons'>
          <h3>Sortuj zadania:</h3>
          <div className='buttonRegural' onClick={this.props.sortByTitle} >Nazwa</div>
          <div className='buttonRegural' onClick={this.props.sortByDone} >Wykonane</div>
          <div className='buttonRegural' onClick={this.props.sortByUrgent} >Ważne</div>
        </div>
      )
    } else {
      return null
    }
  }
}

export default SortButtons
