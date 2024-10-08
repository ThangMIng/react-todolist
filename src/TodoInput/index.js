import React, { Component } from 'react';
import '../App.css';

class TodoInput extends Component {
  handleAdd = (e) => {
    if (e.key === 'Enter') {
      this.props.addTodo(); 
    }
  };

  render() {
    return (
      <input
        className="input-text"
        ref={this.props.inputRef} 
        onKeyDown={this.handleAdd}
        type="text"
        placeholder="What needs to be done? ..."
      />
    );
  }
}

export default TodoInput;
