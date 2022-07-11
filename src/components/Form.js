import React, { useState } from 'react'
import { useToDos } from '../context/toDoContext'

const Form = ({ children }) => {

    const { addToDo } = useToDos()
    const [todoTitle, setToDoTitle] = useState('')

    const sendToDo = async (e) => {
        e.preventDefault()
        /* Check title todo */
        if (todoTitle === ''){
            return alert('Se debe insertar un título para la tarea')
        }
        await addToDo(data)
        setToDoTitle('')
    }

    const data = {
        title: todoTitle,
        message: todoTitle
    }

    return (
        <form action="">
            <input
                type="text"
                placeholder='Escribí un ítem'
                className='bg-transparent text-2xl border-none font-bold placeholder:text-gray-400 focus:ring-transparent pl-0'
                onChange={e => setToDoTitle(e.target.value)}
                value={todoTitle}
            />
            {children}
            <div className="pt-4">
                <button
                    className='rounded-full bg-white text-gray-400 w-full h-10 hover:bg-black'
                    onClick={(e) => sendToDo(e)}
                    aria-label= "addToDoButton"
                >
                    Agregar
                </button>
            </div>
        </form>
    )
}

export default Form