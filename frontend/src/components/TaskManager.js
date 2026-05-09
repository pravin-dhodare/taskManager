import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';

export default function TaskManager() {

  function createData(title, description, deadline, status) {
    return { title, description, deadline, status };
  }

  const rows = [
    createData('Task A', 'Write tests', '2026-05-10', 'TODO'),
    createData('Task B', 'Fix bug', '2026-05-12', 'DONE'),
    createData('Task C', 'Deploy', '2026-05-15', 'IN_REVIEW'),
  ];

  return (
    <TableContainer className="tm-table-container" component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Deadline</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="right">{row.description}</TableCell>
              <TableCell align="right">{row.deadline}</TableCell>
              <TableCell align="right">
                <RenderChip status={row.status}/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export function RenderChip({status}) {
  const variant = status === 'TODO' ? 'primary' : status === 'DONE' ? 'success' : 'default';
  return <Chip label={status} color={variant} />
}