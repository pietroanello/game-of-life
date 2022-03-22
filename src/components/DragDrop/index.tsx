import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

const states = {
  tooMuch: 'Devi selezionare un singolo file alla volta',
  badFormat: 'Assicurati che il formato del tuo file sia corretto',
  default: 'Trascina il file .txt qui, o clicca per selezionarlo',
}

function DragDrop(props: any) {
  const [state, setState] = useState<string>(states.default)

  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles.length > 1) {
      setState(states.tooMuch)
    } else if (acceptedFiles[0].type !== 'text/plain') {
      setState(states.badFormat)
    } else {
      setState(states.default)
      props.onDrop(acceptedFiles)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div className='dragFile' {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? <p>Rilascia il file qui...</p> : <p>{state}</p>}
    </div>
  )
}

export default DragDrop
