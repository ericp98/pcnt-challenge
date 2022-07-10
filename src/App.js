import './App.css'
import ToDoApp from './pages/ToDoApp'
import { ToDosProvider } from './context/toDoContext'

function App() {
  return (
    <ToDosProvider>
      <ToDoApp />
    </ToDosProvider>
  );
}

export default App;
