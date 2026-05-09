import logo from './logo.svg';
import './App.css';
import TaskManager from './components/TaskManager';
import PageTitle from './components/PageTitle';
import React from 'react';
import TaskModal from './components/TaskModal';

function App() {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalMode, setModalMode] = React.useState('add');
  const [modalData, setModalData] = React.useState(null);

  function handleOnAddClick() {
    setModalMode('add');
    setModalData(null);
    setModalOpen(true);
  }

  function handleOpenView(data) {
    setModalMode('view');
    setModalData(data);
    setModalOpen(true);
  }

  function handleOpenEdit(data) {
    setModalMode('edit');
    setModalData(data);
    setModalOpen(true);
  }

  function handleClose() {
    setModalOpen(false);
  }

  function handleSubmit(data) {
    console.log('submit', modalMode, data);
    setModalOpen(false);
  }

  return (
    <div className="App">
      <div className="tm-app-container">
        <PageTitle text="Task Manager" onAddClick={handleOnAddClick} />
        <TaskManager onOpenView={handleOpenView} onOpenEdit={handleOpenEdit} />
        <TaskModal open={modalOpen} mode={modalMode} initialData={modalData} onClose={handleClose} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}

export default App;
