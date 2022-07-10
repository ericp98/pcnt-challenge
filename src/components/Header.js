import { useToDos } from '../context/toDoContext'

function Header() {
    const { areToDos } = useToDos()
    
    const getHeaders = () => {
        return (
            <>
                <div className="text-3xl font-bold pb-4">To do list</div>
                <div className="pb-4">¿Qué cosas tenés que terminar hoy?</div>
            </>
        )
    }

    return areToDos() ? null : getHeaders()
}

export default Header