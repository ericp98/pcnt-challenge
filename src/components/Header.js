import { useToDos } from '../context/toDoContext'

const Header = () => {
    const { areToDos } = useToDos()
    
    const getHeaders = () => {
        return (
            <>
                <div className="text-3xl font-bold pb-4 font-sans">To do list</div>
                <div className="pb-4 font-sans">¿Qué cosas tenés que terminar hoy?</div>
            </>
        )
    }

    return areToDos() ? null : getHeaders()
}

export default Header