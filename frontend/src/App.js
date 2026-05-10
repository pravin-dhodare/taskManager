
import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import TaskManager from './components/TaskManager';
import PageTitle from './components/PageTitle';
import TaskModal from './components/TaskModal';
import { getAllTask, createTask, updateTask, deleteTask } from './utils/apicall.utils'

function App() {

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [modalData, setModalData] = useState(null);
  const [allTask, setAllTask] = useState([])

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
    (async () => {
      if (modalMode === 'add') {
        await createTask({ data });
      } else if (modalMode === 'edit') {
        // ensure id is present
        const payload = { ...data, id: data.id || data._id || modalData && (modalData.id || modalData._id) };
        await updateTask({ data: payload });
      }
      // refresh list
      const result = await getAllTask();
      if (result && result.ok) setAllTask(result.response || []);
      setModalOpen(false);
    })();
  }

  const handleDelete = (id) => {
    (async () => {
      await deleteTask({ id });
      const result = await getAllTask();
      if (result && result.ok) setAllTask(result.response || []);
    })();
  }

  useEffect(() => {
    let mounted = true;
    (async () => {
      const result = await getAllTask();
      if (!mounted) return;
      if (result && result.ok) {
        setAllTask(result.response || []);
      } else {
        setAllTask([]);
      }
    })();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="App">
      <div className="tm-app-container">
        <PageTitle text="Task Manager" onAddClick={handleOnAddClick} />
        <TaskManager data={allTask} onOpenView={handleOpenView} onOpenEdit={handleOpenEdit} onDelete={handleDelete} />
        <TaskModal open={modalOpen} mode={modalMode} initialData={modalData} onClose={handleClose} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}

export default App;
