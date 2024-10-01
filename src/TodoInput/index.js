import React, { Component } from 'react';
import '../App.css';

class TodoInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
    };
  }

  handleAdd = (e) => {
    if (e.key === 'Enter' && this.state.inputValue.trim()) {
      this.props.addTodo(this.state.inputValue);
      this.setState({ inputValue: '' });
    }
  };

  handleChange = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  render() {
    return (
      <input
        className="input-text"
        value={this.state.inputValue}
        onChange={this.handleChange}
        onKeyDown={this.handleAdd}
        type="text"
        placeholder="What need to be done? ..."
      />
    );
  }
}

export default TodoInput;
