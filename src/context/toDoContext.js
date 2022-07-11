import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { getStorageId } from '../helpers/useLocalStorage'
import { filters } from '../data/Filters'

export const ToDoContext = createContext()
export const useToDos = () => useContext(ToDoContext)

export const ToDosProvider = ({ children }) => {

    /* Filters */
    const initialFilter = filters[0].name
    const [filterActive, setFilterActive] = useState(initialFilter)

    /* ToDos: All ToDos and Filter ToDos */
    const [allToDos, setallToDos] = useState()
    const [todosFilter, setToDosFilter] = useState([])

    /* Modal state */
    const [showModal, setshowModal] = useState(false)
    const handlerModal = () => setshowModal(!showModal)

    /* Set filter active in todo list */
    const handlerFilter = (filter) => setFilterActive(filter)

    const API_URL = process.env.REACT_APP_API_URL
        ? process.env.REACT_APP_API_URL + 'todo/' /* + getStorageId() */
        : 'https://api-3sxs63jhua-uc.a.run.app/v1/todo/' /* + getStorageId() */

    /* Get param to call api with applied filter */
    const getParamFilter = (filter) => {
        switch (filter) {
            case "Todos":
                return "/"
            case "Realizados":
                return "/true"
            case "No realizados":
                return "/false"
            default:
                break;
        }
    }

    /* set filter "todos" if all todos are deleted */
    const resetFilter = (todosNumber) => {
        if (todosNumber === 0) handlerFilter("Todos")
    }

    // Set all todos state 
    const setAllTodosState = async () => {
        try {
            const res = await axios.get(API_URL + getStorageId())
            setallToDos(res.data)
            resetFilter(res.data.length)
        } catch (error) {
            console.log(error)
        }
    }

    /* get todos list with applied filter */
    const getToDos = async (filter) => {
        let API_URLFilter = API_URL + getStorageId() + getParamFilter(filter)
        try {
            const res = await axios.get(API_URLFilter)
            setToDosFilter(res.data)
            await setAllTodosState()
        } catch (error) {
            console.log(error)
        }
    }

    const addToDo = async (data) => {
        try {
            await axios.post(API_URL + getStorageId(), data)
            await getToDos(filterActive)
        } catch (error) {
            console.log(error)
        }
    }

    const deleteToDo = async (id) => {
        let data = { todoId: id }

        try {
            await axios.delete(API_URL + getStorageId(), { data })
            await getToDos(filterActive)
        } catch (error) {
            console.log(error)
        }
    }

    const completeToDo = async (bool, id) => {
        let data = { completed: !bool, todoId: id }

        try {
            await axios.put(API_URL + getStorageId(), data)
            await getToDos(filterActive)
        } catch (error) {
            console.log(error)
        }
    }

    const resetToDos = async () => {
        try {
            await axios.delete(API_URL + getStorageId() + '/reset')
            await getToDos(filterActive)
            handlerFilter("Todos")
        } catch (error) {
            console.log(error)
        }
    }

    // Are to dos in list?
    // Execute in conditional render   
    const areToDos = () => allToDos ? allToDos.length > 0 : undefined

    // return true if load all toDos from api 
    const isLoadToDos = () => allToDos !== undefined

    useEffect(() => {
        const setInitialToDos = async () => {
            await getToDos(filterActive)
        }
        setInitialToDos()
    }, [])

    return (
        <ToDoContext.Provider value={{ isLoadToDos, todosFilter, filterActive, getToDos, addToDo, deleteToDo, completeToDo, handlerFilter, resetToDos, areToDos, showModal, handlerModal }}>
            {children}
        </ToDoContext.Provider>
    )
}