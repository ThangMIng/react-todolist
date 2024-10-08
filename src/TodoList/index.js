import React, { Component } from 'react';
import '../App.css';

class TodoList extends Component {
  render() {
    const { todos, toggleTodo, deleteTodo, startEditTodo, clearAll, setFilter } = this.props;

    return (
      <div className="list-item">
        <div className="list">
          {todos.map((item) => (
            <div className="todo" key={item.id} style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="checkbox"
                checked={item.status}
                onChange={() => toggleTodo(item.id)}
                style={{ marginRight: '10px' }}
              />
              <div
                className="todo-item"
                style={{ flex: 1, cursor: 'pointer', textDecoration: item.status ? 'line-through' : 'none' }}
              >
                {item.name}
              </div>
              <button className="btn-edit" onClick={() => startEditTodo(item.id, item.name)}>Sửa</button>
              <button className="btn-x" onClick={() => deleteTodo(item.id)}>x</button>
            </div>
          ))}
        </div>
        <div className="under">
          <button className="btn-1" onClick={clearAll}>Clear All</button>
          <div className="filter-buttons">
            <button onClick={() => setFilter('all')}>Tất cả</button>
            <button onClick={() => setFilter('completed')}>Đã làm</button>
            <button onClick={() => setFilter('incomplete')}>Chưa làm</button>
          </div>
        </div>
      </div>
    );
  }
}

export default TodoList;
