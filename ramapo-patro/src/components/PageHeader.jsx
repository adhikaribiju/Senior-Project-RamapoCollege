import React from 'react'

/*
PageHeader()
NAME
    PageHeader
SYNOPSIS
    PageHeader({ title, path });
DESCRIPTION
    This React component renders a page header with a title and breadcrumb navigation. The title is displayed in large, 
    centered text, and the breadcrumb shows the path back to the homepage. The background is styled with light gray, 
    and the content is centered both vertically and horizontally.

RETURNS
    Returns a header section with a title and breadcrumb navigation link to "Home".
*/


const PageHeader = ({title, path}) => {
  return (
    <div className='py-8 mt-3 bg-[#FAFAFA] rounded flex items-center justify-center'>
        <div>
            <h2 className='text-3xl text-blue font-medium mb-1 text-center'>{title}</h2>
            <p className='text-sm text-center'> <a href="/">Home</a> / {path}</p>
        </div>
    </div>
  )
}

export default PageHeader