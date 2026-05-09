import logo from './logo.svg';
import './App.css';
import TaskManager from './components/TaskManager';
import PageTitle from './components/PageTitle';

function App() {
  return (
    <div className="App">
      <div className="tm-app-container">
        <PageTitle text="Task Manager"/>
        <TaskManager/>
      </div>
    </div>
  );
}

export default App;
