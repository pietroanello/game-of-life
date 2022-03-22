import React from 'react'

const Grid = (props: {
  rows: number
  cols: number
  children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined
}) => {
  return (
    <div
      className='grid'
      style={{
        gridTemplateColumns: `repeat(${props.cols}, 1fr)`,
        gridTemplateRows: `repeat(${props.rows}, ${800 / props.cols}px)`,
      }}
    >
      {props.children}
    </div>
  )
}

export default Grid
