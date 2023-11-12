import React, { useEffect, useState } from 'react'
import './ToDoList.css'

const GetLocalItem = ()=>{
    let List = localStorage.getItem("List")
    if(List){
        return JSON.parse(List);
    }
    else{
        return [];
    }
}
const ToDoList = () => {

    const [item,SetItem] = useState("")
    const [List,SetList] = useState(GetLocalItem())
    const [CurrentIndex,setCurrentIndex] = useState(null)

    const AddTask = ()=>{
        if(CurrentIndex === null){
        if(item!== ""){
        SetList((e)=>{
            return[...e,item]
        })
        SetItem("");}}
        else{
            SetList((e)=>{
                let NewArr = [...e]
                NewArr[CurrentIndex] = item;
                SetItem("")
                setCurrentIndex(null)
                return NewArr;
            })
        }
    }
    const DeleteItem = (id)=>{
        SetList((e)=>{
            return e.filter((elem,index)=> index !== id)
        })
    }
    useEffect(()=>{
        localStorage.setItem("List",JSON.stringify(List));
    },[List,item])
  return (
    <div className='GridCenter'>
        <div className="contains">
        <h1 id='TODOH'>To Do List</h1>
        <input type="text" id='LOP' placeholder='Add Your Task' value={item} onChange={(e)=>SetItem(e.target.value)} />
        <button id='AddTas' onClick={AddTask}>{CurrentIndex !== null ? "Add Edit": "Add Task"}</button>
        <ul id='ul'>
            {
                List && List.map((elem,index)=>{
                    return(
                        <div id='DFG' key={index}><li id='LII' key={index}>{elem} <span>
                            <button id='AddTa' onClick={()=>{
                            DeleteItem(index)
                        }}>Del</button>
                        <button id='AddTa' onClick={()=>{
                            SetItem(elem)
                            setCurrentIndex(index)
                        }}>Edit</button>
                            </span></li>
                        </div>
                    )
                })
            }
        </ul>
        <button id='AddTass' onClick={()=>SetList([])} >Delete All</button>
        </div>
    </div>
  )
}

export default ToDoList
