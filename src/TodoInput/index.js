import React, { useState } from 'react';
import '../App.css';


const TodoInput = ({ addTodo }) => {
  const [inputValue, setInputValue] = useState('');

  const handleAdd = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      addTodo(inputValue);
      setInputValue('');
    }
  };

  return (
    <input
      className="input-text"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onKeyDown={handleAdd}
      type="text"
      placeholder="What need to be done ? ..."
    />
  );
};

export default TodoInput;
