
import React from 'react'

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
    </div>
  )
}

export default PageTitle
