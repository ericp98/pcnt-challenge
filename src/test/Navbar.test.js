import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import { ToDosProvider } from '../context/toDoContext'
import Navbar from '../components/Navbar'

beforeEach(() => render(<ToDosProvider><Navbar/></ToDosProvider>))

test('Show navbar image', async () => {
    const image = screen.getByAltText(/pcnt-logo/i)
    expect(image).toBeInTheDocument() 
})