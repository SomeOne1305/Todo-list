import React from 'react';
import './App.css';
import axios from 'axios'

function App() {
  const [value , setValue] = React.useState('')
  const [todo, setTodo] = React.useState([])
  const [remove, setRemove] = React.useState(0)
  const daysName = ['Mon', "Tue", "Wed", "Thurs", "Fri", "Sat", "Sun"]
  const Months = ['January', "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  const date = new Date()
  function getValue(e){
    setValue(e.target.value)
  }

  React.useEffect(() => {
    async function getTodoData(){
        let todoData = await axios.get('http://localhost:3001/todo')
        setTodo(todoData.data)
    }
    getTodoData()
  }, [value, remove])


 async function postTodo() {

  if(todo.find(item => item.todoName === value)){
    return alert('this todo already add to todo list')
  }else{
    if(value === ""){
      return undefined
     }else{
      await axios.post('http://localhost:3001/todo',{
        "todoName": value,
        "date": `${daysName[date.getDay()]} ${date.getDate()} ${Months[date.getMonth()]} ${date.getFullYear()}`,
      })
     }
  }
     
  setValue(" ")
     
  }

 async function deleteTodo(id){
      await axios.delete(`http://localhost:3001/todo/${id}`)
      setRemove(id)
  }
  

  return (
    <div className="App">
      <div className="form">
        <div className="write">
          <div className="input">
            <div className="text_inp">
            <input onInput={(e) => getValue(e)}  value={value} placeholder='Add new task...'/>
            <div className="line"></div>
            </div>
            <div className="icon" onClick={() => postTodo()}>
              <i className="fa fa-plus"></i>
            </div>
          </div>
        </div>
        <div className="tasks">
          <h1 className="title">Tasks:</h1>
          <ul>
            <li>
              <span className='index'>#</span>
              <p className="word">Task title</p>
              <span className='date' id='date'>Date</span>
            </li>
            {/* {
              todo.map((item, index)=>{
                
                if(todo.length === 0) {
                  <li><span>Oops! No tasks</span><img width={30} height={40} src="" alt="" /></li>
                }else{
                  <li key={item.id}>
                  <span className="index">{`${index+1}`}</span>
                  <p className="word">{item.todoName}</p>
                  <span className="date"></span>
                  <div className="delete" onClick={() => deleteTodo(item.id)}>
                    <i className="fa fa-x"></i>
                  </div>
                  </li>
                }
              })
            } */}
            {
              todo.map((item, index)=>{
                return <li key={item.id}>
                <span className="index">{`${index+1}`}</span>
                <p className="word">{item.todoName}</p>
                <div className="dateBlock">
                  <span className="date">{item.date}</span>
                  <div className="delete" onClick={() => deleteTodo(item.id)}>
                    <i className="fa fa-x"></i>
                  </div>
                </div>
                </li>
              })
            }
            
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
