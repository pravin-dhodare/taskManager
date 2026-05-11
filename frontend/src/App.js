
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
  const [allTask, setAllTask] = useState(null)
  const [loading, setLoading] = useState(false)
  const [fetchError, setFetchError] = useState(false)

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
      setLoading(true);
      if (modalMode === 'add') {
        await createTask({ data });
      } else if (modalMode === 'edit') {
        const payload = { ...data, id: data.id || data._id || (modalData && (modalData.id || modalData._id)) };
        await updateTask({ data: payload });
      }
      const result = await getAllTask();
      setFetchError(!(result && result.ok));
      setAllTask(result && result.ok ? result.response || [] : []);
      setLoading(false);
      setModalOpen(false);
    })();
  }

  const handleDelete = (id) => {
    (async () => {
      setLoading(true);
      await deleteTask({ id });
      const result = await getAllTask();
      setFetchError(!(result && result.ok));
      setAllTask(result && result.ok ? result.response || [] : []);
      setLoading(false);
    })();
  }

  const handleChangeStatus = (id, newStatus) => {
    (async () => {
      setLoading(true);
      await updateTask({ data: { id, status: newStatus } });
      const result = await getAllTask();
      setFetchError(!(result && result.ok));
      setAllTask(result && result.ok ? result.response || [] : []);
      setLoading(false);
    })();
  }

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      const result = await getAllTask();
      if (!mounted) return;
      setFetchError(!(result && result.ok));
      setAllTask(result && result.ok ? result.response || [] : []);
      setLoading(false);
    })();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="App">
      <div className="tm-app-container">
        <PageTitle text="Task Manager" onAddClick={handleOnAddClick} />
        <TaskManager data={allTask} loading={loading} error={fetchError} onOpenView={handleOpenView} onOpenEdit={handleOpenEdit} onDelete={handleDelete} onChangeStatus={handleChangeStatus} />
        <TaskModal open={modalOpen} mode={modalMode} initialData={modalData} onClose={handleClose} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}

export default App;
