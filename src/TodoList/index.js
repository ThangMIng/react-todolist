import React, { useState } from 'react';
import '../App.css';


const TodoList = ({ todos, toggleTodo, deleteTodo, editTodo, setFilter, clearAll }) => {
  const [idEdit, setIdEdit] = useState(-1);

  return (
    <div class='list-item'>
      <div className='list'>
        {todos.map((item, index) => (
          <div class='todo' key={item.id} style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type='checkbox'
              checked={item.status}
              onChange={() => toggleTodo(index)}
              style={{ marginRight: '10px' }}
            />
            {item.id === idEdit ? (
              <input
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    editTodo(item.id, e.target.value);
                    setIdEdit(-1);
                  }
                }}
                style={{ flex: 1, marginBottom: '5px' }}
                defaultValue={item.name}
              />
            ) : (
              <div class='todo-item'
                onClick={() => setIdEdit(item.id)}
                style={{ flex: 1, cursor: 'pointer', textDecoration: item.status ? 'line-through' : 'none' }}
              >
                {item.name}
              </div>
            )}
            <button class='btn-x' onClick={() => deleteTodo(item.id)}>x</button>
          </div>
        ))}
      </div>
      <div className='under'>
        <button className='btn-1' onClick={() => clearAll()}>Clear All</button>
        <div className='filter-buttons'>
          <button onClick={() => setFilter('all')}>Tất cả</button>
          <button onClick={() => setFilter('completed')}>Đã làm</button>
          <button onClick={() => setFilter('incomplete')}>Chưa làm</button>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
