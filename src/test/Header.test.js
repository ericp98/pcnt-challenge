import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import { ToDosProvider } from '../context/toDoContext'
import Header from '../components/Header'

beforeEach(() => render(<ToDosProvider><Header/></ToDosProvider>))


test('Show header title', async () => {
    const title = screen.getByText(/To do list/i)
    expect(title).toBeInTheDocument()
})

test('Show header text description', () => {
    const textDescription = screen.getByText(/¿Qué cosas tenés que terminar hoy?/i)
    expect(textDescription).toBeInTheDocument() 
})  