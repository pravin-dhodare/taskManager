import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import TaskModal from './TaskModal';

export default function TaskManager({ loading, data, modalOpen, modalMode, modalData, handleClose, handleSubmit, onOpenView, onOpenEdit, onDelete, onChangeStatus }) {

  console.log("Data", data);
  
  const formatDate = (raw) => {
    if (!raw) return '';
    try {
      const d = new Date(raw);
      if (!isNaN(d)) return d.toISOString().slice(0,10);
    } catch (e) {}
    // fallback: if it's already a string like YYYY-MM-DD or ISO, take first 10 chars
    return typeof raw === 'string' && raw.length >= 10 ? raw.slice(0,10) : '';
  };

  

  return (
    <>
      <TableContainer className="tm-table-container" component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Deadline</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <CircularProgress size={24} />
                </TableCell>
              </TableRow>
            ) : (!data || data.length === 0) ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Typography variant="body2">No tasks available</Typography>
                </TableCell>
              </TableRow>
            ) : data.map((row) => (
              <TableRow
                key={row._id || row.id || row.title}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell align="right" className="tm-desc">{row.description}</TableCell>
                <TableCell align="right">{formatDate(row.deadline)}</TableCell>
                <TableCell align="right">
                  <RenderChip status={row.status} />
                </TableCell>
                <TableCell className="tm-action" align="right">
                  {(() => {
                    const id = row._id || row.id;
                    // normalize status
                    const s = (row.status || '').toString().trim().toUpperCase().replace(/\s+/g,'_');
                    // parse deadline
                    let isOverdue = false;
                    if (row.deadline) {
                      try {
                        const d = new Date(row.deadline);
                        isOverdue = !isNaN(d) && d < new Date();
                      } catch (e) { isOverdue = false; }
                    }

                    if (isOverdue && (s === 'TODO' || s === 'IN_PROGRESS' || s === 'INPROGRESS')) {
                      return (
                        <IconButton aria-disabled="true" tabIndex={-1} className="tm-inactive" aria-label="Overdue" title="Task overdue" size="small" color="secondary" onClick={(e)=>e.preventDefault()} onMouseDown={(e)=>e.preventDefault()}>
                          <EventBusyIcon sx={{color: red[500]}} />
                        </IconButton>
                      );
                    }

                    if (s === 'IN_PROGRESS' || s === 'INPROGRESS' || s === 'IN-PROGRESS') {
                      // show Mark as Done
                      return (
                        <IconButton aria-label="Mark Done" title="Mark as Done" size="small" color="secondary" onClick={() => onChangeStatus && onChangeStatus(id, 'DONE')}>
                          <EventAvailableIcon color="success" />
                        </IconButton>
                      );
                    }

                    // status TODO or DONE (or anything else) => show Start Progress
                    return (
                      <IconButton aria-label="Start Progress" title="Start Progress" size="small" color="secondary" onClick={() => onChangeStatus && onChangeStatus(id, 'IN_PROGRESS')}>
                        <EventRepeatIcon color="action" />
                      </IconButton>
                    );
                  })()}

                  <IconButton aria-label="View Task" title="View Task" size="small" color="secondary" onClick={() => onOpenView && onOpenView(row)}>
                    <ViewHeadlineIcon />
                  </IconButton>

                  <IconButton aria-label="Edit Task" title="Edit Task" size="small" onClick={() => onOpenEdit && onOpenEdit(row)}>
                    <EditNoteIcon color="primary" />
                  </IconButton>

                  <IconButton aria-label="Delete Task" title="Delete Task"  size="small" onClick={() => onDelete && onDelete(row._id || row.id)}>
                    <DeleteSweepIcon sx={{ color: red[500] }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TaskModal open={modalOpen} mode={modalMode} initialData={modalData} onClose={handleClose} onSubmit={handleSubmit} />
    </>
  )
}

export function RenderChip({status}) {
  const variant = status === 'TODO' ? 'primary' : status === 'DONE' ? 'success' : 'default';
  return <Chip label={status} color={variant} />
}