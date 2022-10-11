import './App.css';

function App() {
  return (
    <div className="App">
      <div className="form">
        <div className="write">
          <div className="input">
            <input type="text" placeholder='Add new task...'/>
            <div className="icon">
              <i className="fa fa-plus"></i>
            </div>
          </div>
        </div>
        <div className="tasks">
          <h1 className="title">Tasks:</h1>
          <ul>
            <li>
              <span>#</span>
              <p className="word">Task title</p>
              <span>Date</span>
            </li>
            <li>
              <span>1.</span>
              <p className="word"></p>

            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
