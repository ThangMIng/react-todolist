import './App.css';
import React from 'react';
import TodoInput from './TodoInput/index.js';
import TodoList from './TodoList/index.js';
import ThemeToggle from './Theme/ThemeToggle.js';
import { ThemeContext,ThemeProvider } from './Theme/ThemeContext';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { id: 0, name: 'Làm bài tập', status: true },
        { id: 1, name: 'Giặt đồ', status: false }
      ],
      filter: 'all'
    };
  }

  findMax = () => {
    return this.state.data.length ? Math.max(...this.state.data.map(item => item.id)) : 0;
  }

  addTodo = (name) => {
    const newData = [...this.state.data, { id: this.findMax() + 1, name, status: false }];
    this.setState({ data: newData });
  }

  editTodo = (id, name) => {
    this.setState(prevState => ({
      data: prevState.data.map(item => item.id === id ? { ...item, name } : item),
    }));
  }

  toggleTodo = (index) => {
    this.setState(prevState => ({
      data: prevState.data.map((item, idx) => idx === index ? { ...item, status: !item.status } : item)
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
      <ThemeProvider>
        <ThemeContext.Consumer>
          {({ isDarkTheme }) => {
            document.body.className = isDarkTheme ? 'dark-theme' : 'light-theme';
            return (
              <div className="App">
                <h1>todos</h1>
                <TodoInput addTodo={this.addTodo} />
                <TodoList
                  todos={filteredData}
                  toggleTodo={this.toggleTodo}
                  deleteTodo={this.deleteTodo}
                  editTodo={this.editTodo}
                  setFilter={this.setFilter}
                  clearAll={this.clearAll}
                />
                <div className='btn-tg'><ThemeToggle /></div>
              </div>
            );
            }}
          </ThemeContext.Consumer>
      </ThemeProvider>
    );
  }
}

export default App;
