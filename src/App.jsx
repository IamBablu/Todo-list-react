import { useState , useEffect} from 'react'
import note from './assets/note.svg';
import hide from './assets/hide.svg'
import show from './assets/show.svg'
import './App.css'
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setShowFinished] = useState(true)
  useEffect(() => {
    let todos = JSON.parse(localStorage.getItem("todos"))
    setTodos(todos)
  }, [])
  


  const hendleChange = (e)=>{
    setTodo(e.target.value)
  }

  const hendleAdd = ()=>{
    if(todo !==""){
      setTodos([...todos, {id:uuidv4() ,todo, isCompleted: false}])
    setTodo("");
    }else{
      alert("Plese write somthing!");
    }
    saveToLS();
    console.log("Add");
  }
  
  const toggleComplite = (e)=>{
    setShowFinished(!showFinished);
  }

  const clearAll = ()=>{
    let Delete = confirm("Do yo want to delete all your tast!")
    Delete? setTodos([]): "";
    saveToLS();
    console.log("all clear");
  }

  const hendleIsComplite = (e)=>{
    let id = e.target.name;
    let index = todos.findIndex(item=>{
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !(newTodos[index].isCompleted)
    setTodos(newTodos);
    saveToLS();
  }

  const hendleEdit = (e, id)=>{
    let t = todos.filter(i=>i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter(item=>{
      return item.id !== id;
    })
    setTodos(newTodos);
    saveToLS();
  }

  const hendleDelete = (e,id)=>{
    if(confirm("You really want to delete")){
      let newTodos = todos.filter(item=>{
        return item.id !== id;
      })
      setTodos(newTodos);
    }
    saveToLS();
  }

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }
  

  return (
    <>
    <div className="m-auto bg-white mx-[32vw] p-4 rounded-xl">
    <div className='flex items-center gap-3'>
    <h1 className="font-bold text-[#213b76]">To-Do List </h1>
    <img className='w-10 h-10 opacity-50 mt-2' src={note} alt="" />
    </div>
    <div className="inpute mt-8 rounded-full bg-[#edeef0] w-[28rem]">
    <input onChange={hendleChange} value={todo} className='bg-[#edeef0] p-2 text-xl rounded-full px-6 outline-none border-none w-[22rem]' placeholder='heyy!' type="text" />
    <button onClick={hendleAdd} className='bg-[#ff5442] rounded-full px-8 border-none'>Add </button>
    </div>
    <div className="flex justify-between mt-3">
    <p className='flex items-center gap-2 font-medium my-3 cursor-pointer'><input className='cursor-pointer' type="checkbox" onChange={toggleComplite} checked={showFinished}/>Show finished</p>
    <button onClick={clearAll} className='bg-[#ff5442] rounded-full px-4 border-none py-0 text-sm h-8'>All Clear</button>

    </div>
    <hr />

    <div className="tasks w-[28rem] h-80 overflow-auto p-0">

    {todos.map(item=>{

      return (showFinished || !item.isCompleted) && <div key={item.id} className="task flex bg-[#edeef0] text-xl items-center gap-2 rounded-full mt-3 ">
        <input name={item.id} type="checkbox" checked={item.isCompleted} className='ml-2 cursor-pointer' onChange={hendleIsComplite} />
        <p className='w-80 overflow-auto text-lg py-0'  ><span className={item.isCompleted?"line-through":""}>{item.todo}</span></p>
        <button onClick={(e)=>{hendleEdit(e,item.id)}} className='rounded-full bg-[#ff5442] px-4 py-2 mx-0'><CiEdit /></button>
        <button onClick={(e)=>{hendleDelete(e, item.id)}} className='rounded-full bg-[#ff5442] px-4 py-2 mx-0'><MdDelete /></button>
      </div>
    })}
    </div>
    </div>
    </>
  )
}

export default App
