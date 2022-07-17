import React, { useState } from 'react';
import './App.css';

function App() {
  //states
  const [todoTitle,setTodoTitle]=useState("");
  const [todoList, setTodoList]=useState([]);
  const [isEditable, setEditable]=useState(false);
  const [editableTodo, setEditableTodo]=useState(null);


  const createHandler= (event)=>{
    event.preventDefault();

    const newTodo={
      id:Date.now(),
      title: todoTitle
    }

    if(todoTitle){
      {setTodoList([newTodo
        , ...todoList])
      setTodoTitle("");}
    }else{
      alert("Wrong Input");
    }
  }

  const editHandler= (id) => {
    const toBeEdited= todoList.find( todo => todo.id === id)
    console.log(toBeEdited);
    console.log(isEditable);
    setEditable(true);
    setEditableTodo(toBeEdited);
    setTodoTitle(toBeEdited.title);
  }

  const updateHandler= (event) =>{
    event.preventDefault()
    if(todoTitle){
      editableTodo.title= todoTitle;
      setTodoTitle("")
      setEditable(false);
      setEditableTodo(null);
    }else{
      alert("Input field can't be empty")
      setTodoTitle("")
      setEditable(false);
      setEditableTodo(null);
    }
  }

  const deleteHandler= (id) =>{
    //j id ta milbe na tader filter kore newTodoList banabe
    const newTodoList = todoList.filter( todo => todo.id != id);
    setTodoList(newTodoList);
  }

  return (
    <div className="App">
      <h1>TODO with React CRUD</h1>
      <form action="">
        <input type="text" name="todoTitle" id="input"
        value={todoTitle} placeholder='input a valid TODO' onChange={ (event) => setTodoTitle(event.target.value)} />

        <button className='addBtn blueBtn' onClick={(event) => isEditable === true ? updateHandler(event) : createHandler(event)}>{ isEditable === true ? "Update button": "Add button" }</button>

      </form>
      <ul>
        {todoList.map( todo => (
          <li>
            <p>{todo.title}</p>

            {/* edit button fnctionality */}
            <button className='editBtn pinkBtn' onClick={ () => editHandler(todo.id) }>Edit</button>

            {/* delete button functionality */}
            <button className='delBtn redButn'onClick={ () =>{
            //  deleteHandeler function k id ditesi
             deleteHandler(todo.id)
              console.log(todo.id);
            }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
