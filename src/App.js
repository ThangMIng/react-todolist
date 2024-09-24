
import './App.css';
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super();
    this.state = {
      data: [
        {
          id: 0,
          name: 'Làm bài tập',
          status: true
        },
        {
          id: 1,
          name: "Giặt đồ",
          status: false
        }
      ],
      search: ''
    }
  }

  findMax = () => {
    const { data } = this.state;
    let max = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i].id > max) {
        max = data[i].id
      }
    }
    return max;
  }

  add = (e) => {
    const { value } = e.target;
    const { data } = this.state;
    const max = this.findMax();

    const newData = [...data, { id: max + 1, name: value, status: false }]

    this.setState({
      data: newData,
      search: ''
    })
    // console.log(value)
  }

  changeSearch = (e) => {
    const { value } = e.target;
    this.setState({
      search: value
    })
  }

  render() {

    // const abc = this.state.data;
    // const test = this.state.test;
    const { data, search } = this.state;

    return (
      <div className="App">
        <div>Header</div>

        <div class="container">
          <input
            class="input-text"
            value={search}
            onChange={(e) => this.changeSearch(e)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                this.add(e)
              }
            }}
            type="text"
            id="task-input"
            placeholder="What need to be done ? ..."
          />
          {/* <button id="add-task" >Thêm</button> */}

          <div>
            {
              data.map((item, index) => {
                return (
                  <div key={item.id} style={{ display: 'flex' }}>
                    <input type='checkbox' checked={item.status} />
                    <div style={{ display: 'flex', flex: 1, marginLeft: '5px' }}>{item.name}</div>
                  </div>
                )
              })
            }


          </div>
        </div>

        {/* <div class="container">

        </div> */}


      </div>
    )
  }

}

export default App;
