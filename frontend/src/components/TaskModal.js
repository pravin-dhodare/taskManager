import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function TaskModal({ open, mode = 'add', initialData = {}, onClose, onSubmit }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    deadline: '',
    status: 'TODO',
    file: null,
  });

  useEffect(() => {
    // Initialize form when the dialog is opened to avoid update loops
    if (!open) return;
    setForm({
      title: initialData?.title || '',
      description: initialData?.description || '',
      deadline: initialData?.deadline || '',
      status: initialData?.status || 'TODO',
      file: null,
    });
    // only run when `open` changes
  }, [open]);

  const disabled = mode === 'view';

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  function handleFile(e) {
    setForm((s) => ({ ...s, file: e.target.files?.[0] || null }));
  }

  function handleSubmit() {
    if (onSubmit) onSubmit(form);
    if (onClose) onClose();
  }

  const titleMap = {
    add: 'Add Task',
    edit: 'Edit Task',
    view: 'View Task',
  };

  return (
    <Dialog open={!!open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{titleMap[mode] || 'Task'}</DialogTitle>
      <DialogContent>
        <TextField
          margin="normal"
          label="Title"
          name="title"
          fullWidth
          value={form.title}
          onChange={handleChange}
          disabled={disabled}
        />
        <TextField
          margin="normal"
          label="Description"
          name="description"
          fullWidth
          multiline
          rows={3}
          value={form.description}
          onChange={handleChange}
          disabled={disabled}
        />
        <TextField
          margin="normal"
          label="Due date"
          name="deadline"
          type="date"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={form.deadline}
          onChange={handleChange}
          disabled={disabled}
        />

        <FormControl component="fieldset" margin="normal">
          <FormLabel component="legend">Status</FormLabel>
          <RadioGroup row name="status" value={form.status} onChange={handleChange}>
            <FormControlLabel value="TODO" control={<Radio />} label="TODO" disabled={disabled} />
            <FormControlLabel value="DONE" control={<Radio />} label="DONE" disabled={disabled} />
          </RadioGroup>
        </FormControl>

        <div style={{ marginTop: 12 }}>
          <input type="file" name="linkedFile" onChange={handleFile} disabled={disabled} />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        {mode !== 'view' && (
          <Button variant="contained" onClick={handleSubmit}>
            {mode === 'add' ? 'Add' : 'Save'}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
