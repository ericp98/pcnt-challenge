import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import { ToDosProvider } from '../context/toDoContext'
import Form from '../components/Form'

beforeEach(() => render(<ToDosProvider><Form /></ToDosProvider>))

test('Show input to write todo title', () => {
    const input = screen.getByPlaceholderText(/Escribí un ítem/i)
    expect(input).toBeInTheDocument()
})

test('Show button to add todo', () => {
    const button = screen.getByRole('button', { name: 'addToDoButton' })
    expect(button).toBeInTheDocument() 
}) 