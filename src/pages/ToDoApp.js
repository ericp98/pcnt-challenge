// components
import Header from '../components/Header'
import Form from '../components/Form'
import ToDoList from '../components/ToDoList'
import Navbar from '../components/Navbar'
import Container from '../components/Container'
import Modal from '../components/Modal'
import LoadingSpinner from '../components/LoadingSpinner'

// helpers
import { setUserId } from '../helpers/useLocalStorage' 

// context
import { useToDos } from '../context/toDoContext'

function ToDoApp() {
    // Set user id if not exist
    setUserId() 

    const { isLoadToDos } = useToDos()

    return (
        isLoadToDos()? 
        <Container>
            <Navbar />
            <Header />
            <Form>
                <ToDoList />
            </Form>
            <Modal/> 
        </Container> 
        : 
        <LoadingSpinner/>  
    )
}

export default ToDoApp