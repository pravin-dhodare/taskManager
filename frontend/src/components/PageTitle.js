
import React from 'react'
import Button from '@mui/material/Button';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

const PageTitle = ({text = "Page title"}) => {
  return (
    <div className="tm-page-title">
      <h2 className="tm-page-title-text">
        <svg className="tm-task-logo" width="32px" height="32px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 11l3 3L22 4"></path>
          <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        {text}
      </h2>
      <Button variant="outlined" startIcon={<PlaylistAddIcon />} sx={{ color: 'white' }}>
        Add Task
      </Button>
    </div>
  )
}

export default PageTitle
