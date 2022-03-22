import React, { useRef, useState } from 'react'
import './App.scss'
import DragDrop from './components/DragDrop'
import Grid from './components/Grid'
import useGame from './hooks/useGame'
import useLoadFile from './hooks/useLoadFile'

function App() {
  const [matrix, setMatrix] = useState<number[][]>([])
  const [generation, setGeneration] = useState<number>(0)

  // Ref to the inital generation,
  const initialGen = useRef<number>()

  const { loadFile, numCols, numRows, getStartMatrix } = useLoadFile()
  const { nextMove, playPauseGame, play } = useGame(matrix, setMatrix, setGeneration)

  const handleChange = async (files: File[]) => {
    const result = await loadFile(files)
    if (result) {
      result.matrix && setMatrix(result.matrix)
      if (result.generation) {
        setGeneration(result.generation)
        initialGen.current = result.generation
      }
    }
    return result
  }

  const handleReset = () => {
    playPauseGame(true)
    setTimeout(() => {
      initialGen.current && setGeneration(initialGen.current)
      setMatrix(getStartMatrix())
    }, 200)
  }

  const loadNewFile = () => {
    playPauseGame(true)
    setTimeout(() => {
      setMatrix([])
    }, 200)
  }

  const renderCells = matrix.flat().map((cell, index) => {
    const className = cell ? 'cell active' : 'cell'
    return <div key={index} className={className} style={{ height: 800 / numCols }} />
  })

  return (
    <>
      <h1 className='pageTitle'>⊞ Game of life</h1>
      {matrix.length === 0 && <DragDrop onDrop={handleChange} />}
      {matrix.length > 0 ? (
        <>
          <div className='h-flex'>
            <p>Generation: {generation}</p>
            <button onClick={loadNewFile}>Carica un nuovo file</button>
          </div>
          <Grid rows={numRows} cols={numCols}>
            {renderCells}
          </Grid>
          <div className='h-flex'>
            <div className='stats'>
              <p>Rows: {numRows}</p>
              <p>Cols: {numCols}</p>
            </div>
            <div className='inputs'>
              {!play && <button onClick={nextMove}>Next move</button>}
              <button onClick={() => playPauseGame()}>{play ? 'Pause' : 'Play'}</button>
              <button onClick={handleReset}>Reset</button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className='h-flex'>
            <p>Come creare il file .txt</p>
          </div>
          <img className='legend' src='./legend.png' alt='legend' />
        </>
      )}
      <div className='footer'>
        <a href='https://github.com/pietroanello/game-of-life' target='_blank'>
          <img src='/github.svg' alt='github_logo' />
        </a>
      </div>
    </>
  )
}

export default App
