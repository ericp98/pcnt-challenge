import '@testing-library/jest-dom/extend-expect'
import { fireEvent, getByTestId, render, screen } from '@testing-library/react'
import { ToDosProvider } from '../context/toDoContext'
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

test('Show button to open modal to reset todolist', async () => {
    render(<ToDosProvider><ToDoList /></ToDosProvider>)
    await screen.findByAltText(/resetList/i)
    const btnShowModal = screen.queryByAltText("resetList")
    expect(btnShowModal).toBeInTheDocument()
})

test('Show button to open filter list', async () => {
    render(<ToDosProvider><ToDoList /></ToDosProvider>)
    await screen.findByAltText(/showPopper/i)
    const btnShowModal = screen.queryByAltText("showPopper")
    expect(btnShowModal).toBeInTheDocument()
})

test('On click filter button, show popper with filter list', async () => {
    render(<ToDosProvider><ToDoList /></ToDosProvider>)
    await screen.findByAltText(/showPopper/i)
    const btnShowModal = screen.queryByAltText("showPopper")
    fireEvent.click(btnShowModal)

    const filterRealizados = await screen.findByText("Realizados")
    const filterNoRealizados = await screen.findByText("No realizados")

    expect(filterRealizados).toBeInTheDocument()
    expect(filterNoRealizados).toBeInTheDocument()
})

test('Show task load in todolist component', async () => {
    render(<ToDosProvider><ToDoList /></ToDosProvider>)
    await screen.findByText(/Tarea de prueba/i)
    const taskLoaded = screen.queryByText(/Tarea de prueba/i)
    expect(taskLoaded).toBeInTheDocument() 
})
