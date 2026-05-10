import React from 'react'
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

export default function TaskManager({ data, modalOpen, modalMode, modalData, handleClose, handleSubmit, onOpenView, onOpenEdit, onDelete }) {

  console.log("Data", data);
  

  

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
            {data.map((row) => (
              <TableRow
                key={row._id || row.id || row.title}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell align="right" className="tm-desc">{row.description}</TableCell>
                <TableCell align="right">{row.deadline}</TableCell>
                <TableCell align="right">
                  <RenderChip status={row.status} />
                </TableCell>
                <TableCell className="tm-action" align="right">
                  <IconButton aria-disabled="true" tabIndex={-1} className="tm-inactive" aria-label="Failed" title="Failed to complete" size="small" color="secondary" onClick={(e)=>e.preventDefault()} onMouseDown={(e)=>e.preventDefault()}>
                    <EventBusyIcon color="action" />
                  </IconButton>

                  <IconButton aria-label="Inprogress" title="Inpogress, Mark as Done" size="small" color="secondary">
                    <EventRepeatIcon color="action" />
                  </IconButton>

                  <IconButton aria-disabled="true" tabIndex={-1} className="tm-inactive" aria-label="Done" title="Done" size="small" color="secondary" onClick={(e)=>e.preventDefault()} onMouseDown={(e)=>e.preventDefault()}>
                    <EventAvailableIcon color="success" />
                  </IconButton>

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