import { useToDos } from '../context/toDoContext'

const Modal = () => {

    const { resetToDos, showModal, handlerModal } = useToDos()

    const deleteToDos = (e) => {
        e.preventDefault()
        resetToDos()
        handlerModal()
    }

    const getModal = () =>
    <div className="fixed bg-gray-500/50 w-full h-full top-0 left-0">
        <div className="flex flex-col absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white w-5/6 md:w-1/2 lg:w-1/4 p-8">
            <div className="text-2xl font-bold pb-4">Empezar nueva lista</div>
            <div className="pb-4">Cuando comenzas una nueva lista, tu lista existente se elimina. <br /> ¿Estas seguro que queres empezar una nueva lista?</div>
            <div className="flex justify-around">
                <button className="rounded-full border border-black bg-white text-black w-1/2 h-10 mr-4" onClick={() => handlerModal()}>Cancelar</button>
                <button className="rounded-full border bg-black w-1/2 text-white h-10" onClick={(e) => deleteToDos(e)}>Nueva Lista</button>
            </div>
        </div>
    </div>

    return (
        showModal ? getModal() : null
    )
}

export default Modal