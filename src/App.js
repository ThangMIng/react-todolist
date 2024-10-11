import './App.css';
import React from 'react';
import TodoInput from './TodoInput';
import TodoList from './TodoList';
import ThemeToggle from './Theme/ThemeToggle';
import infiniteScroll from './HOC/Scroll.js';
import { ThemeContext } from './Theme/ThemeContext.js';

const TodoListInfiniteScroll = infiniteScroll(TodoList, 5);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      filter: 'all',
      editId: null,
    };
    this.inputRef = React.createRef();
  }

  addTodo = () => {
    const name = this.inputRef.current.value.trim();
    if (this.state.editId !== null) {
      this.setState(prevState => ({
        data: prevState.data.map(item => item.id === this.state.editId ? { ...item, name } : item),
        editId: null
      }));
    } else if (name) {
      const newData = [...this.state.data, { id: this.findMax() + 1, name, status: false }];
      this.setState({ data: newData });
    }
    this.inputRef.current.value = '';
  }

  findMax = () => {
    return this.state.data.length ? Math.max(...this.state.data.map(item => item.id)) : 0;
  }

  startEditTodo = (id, name) => {
    this.setState({ editId: id });
    this.inputRef.current.value = name;
  }

  toggleTodo = (id) => {
    this.setState(prevState => ({
      data: prevState.data.map(item => item.id === id ? { ...item, status: !item.status } : item)
    }));
  }

  deleteTodo = (id) => {
    this.setState(prevState => ({
      data: prevState.data.filter(item => item.id !== id)
    }));
  }

  setFilter = (filter) => {
    this.setState({ filter });
  }

  clearAll = () => {
    this.setState({ data: [] });
  }

  render() {
    const { data, filter } = this.state;

    const filteredData = data.filter(item => {
      if (filter === 'completed') return item.status;
      if (filter === 'incomplete') return !item.status;
      return true;
    });

    return (
      <ThemeContext.Consumer>
        {({ isDarkTheme }) => {
          document.body.className = isDarkTheme ? 'dark-theme' : 'light-theme';
          return (
            <div className="App">
              <h1>todos</h1>
              <TodoInput addTodo={this.addTodo} inputRef={this.inputRef} /> 
              <TodoListInfiniteScroll
                data={filteredData}
                toggleTodo={this.toggleTodo}
                deleteTodo={this.deleteTodo}
                startEditTodo={this.startEditTodo}
                setFilter={this.setFilter}
                clearAll={this.clearAll}
              />
              <div className='btn-tg'><ThemeToggle /></div>
            </div>
          );
        }}
      </ThemeContext.Consumer>
    );
  }
}

export default App;
