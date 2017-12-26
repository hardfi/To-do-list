import React from 'react';

class SecretButtons extends React.Component {
  render(){
    return (
      <div className='secretButtons'>
        <div className='secretOne' onClick={this.props.slide} ></div>
        <div className='secretTwo' onClick={this.props.backgroundChange} ></div>
      </div>
    )
  }
}

export default SecretButtons
