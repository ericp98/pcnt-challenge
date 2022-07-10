import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import { ToDosProvider } from '../context/toDoContext'
import Form from '../components/Form'

beforeEach(() => render(<ToDosProvider><Form/></ToDosProvider>))

test('Show input to enter todo title', async () => {
    const input = screen.getByPlaceholderText("Escribí un ítem")
    expect(input).toBeInTheDocument() 
})