import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import { ToDosProvider } from '../context/toDoContext'
import Form from '../components/Form'
import ToDoList from '../components/ToDoList'

jest.mock('axios', () => ({
    __esModule: true,

    default: {
        get: () => ({
            data: [
                {
                    "completed": false,
                    "message": "Mensaje de prueba",
                    "title": "Tarea de prueba",
                    "id": "063dc9ed-e64e-480a-aef4-29c9dc2fb0ec"
                }
            ]
        })
    }
}))

test('Show children todolist in Form component', async () => {
    render(<ToDosProvider><Form><ToDoList/></Form></ToDosProvider>)
    await screen.findByAltText(/resetList/i)
    const btnShowModal = screen.queryByAltText("resetList")
    expect(btnShowModal).toBeInTheDocument()
})

test('Show input to write item title', async () => {
    render(<ToDosProvider><Form><ToDoList/></Form></ToDosProvider>)
    await screen.findByPlaceholderText("Escribí un ítem")
    const input = screen.queryByPlaceholderText("Escribí un ítem")
    expect(input).toBeInTheDocument()
})

test('Show button to add todo', async () => {
    render(<ToDosProvider><Form><ToDoList/></Form></ToDosProvider>)
    await screen.findByRole('button', { name: 'addToDoButton' })
    const button = screen.queryByRole('button', { name: 'addToDoButton' })
    expect(button).toBeInTheDocument()
}) 

/* beforeEach(() => render(<ToDosProvider><Form><ToDoList/></Form></ToDosProvider>)) */

/* test('Show input to write todo title', () => {
    const input = screen.getByPlaceholderText(/Escribí un ítem/i)
    screen.debug()
    expect(input).toBeInTheDocument()
}) */

/* test('Show button to add todo', () => {
    const button = screen.getByRole('button', { name: 'addToDoButton' })
    expect(button).toBeInTheDocument() 
})  */