import './App.css';
import React from 'react';
import TodoInput from './TodoInput/index.js';
import TodoList from './TodoList/index.js';
import ThemeToggle from './Theme/ThemeToggle.js';
import InfiniteScroll from './scroll/infiniteScroll';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      filter: 'all',
      editId: null,
      currentPage: 0,
      todosPerPage: 5,
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
    this.setState({ data: [], currentPage: 0 });
  }

  loadMore = () => {
    this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }));
  }

  render() {
    const { data, filter, currentPage, todosPerPage } = this.state;

    const filteredData = data.filter(item => {
      if (filter === 'completed') return item.status;
      if (filter === 'incomplete') return !item.status;
      return true;
    });

    const hasMore = currentPage * todosPerPage < filteredData.length;

    const todosToDisplay = filteredData.slice(0, (currentPage + 1) * todosPerPage);

    return (
        <div className="App">
          <h1>todos</h1>
          <TodoInput addTodo={this.addTodo} inputRef={this.inputRef} />
          <TodoList
            todos={todosToDisplay}
            toggleTodo={this.toggleTodo}
            deleteTodo={this.deleteTodo}
            startEditTodo={this.startEditTodo}
            setFilter={this.setFilter}
            clearAll={this.clearAll}
          />
          <InfiniteScroll loadMore={this.loadMore} hasMore={hasMore} />
          <ThemeToggle />
        </div>
    );
  }
}

export default App;
