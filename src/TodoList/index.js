import React, { Component } from 'react';
import '../App.css';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idEdit: -1,
    };
  }

  render() {
    const { todos, toggleTodo, deleteTodo, editTodo, clearAll, setFilter } = this.props;

    return (
      <div className="list-item">
        <div className="list">
          {todos.map((item, index) => (
            <div className="todo" key={item.id} style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="checkbox"
                checked={item.status}
                onChange={() => toggleTodo(index)}
                style={{ marginRight: '10px' }}
              />
              {item.id === this.state.idEdit ? (
                <input
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      editTodo(item.id, e.target.value);
                      this.setState({ idEdit: -1 });
                    }
                  }}
                  style={{ flex: 1, marginBottom: '5px' }}
                  defaultValue={item.name}
                />
              ) : (
                <div
                  className="todo-item"
                  onClick={() => this.setState({ idEdit: item.id })}
                  style={{ flex: 1, cursor: 'pointer', textDecoration: item.status ? 'line-through' : 'none' }}
                >
                  {item.name}
                </div>
              )}
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
