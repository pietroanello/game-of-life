import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

const states = {
  tooMuch: 'Devi selezionare un singolo file alla volta',
  badFormat: 'Assicurati che il formato del tuo file sia corretto',
  default: 'Trascina il file .txt qui, o clicca per selezionarlo',
  badFile: "Ops! C'è qualche problema nel tuo file. Controlla l'esempio qui sotto.",
}

function DragDrop(props: any) {
  const [state, setState] = useState<string>(states.default)

  const onDrop = useCallback(async acceptedFiles => {
    if (acceptedFiles.length > 1) {
      setState(states.tooMuch)
    } else if (acceptedFiles[0].type !== 'text/plain') {
      setState(states.badFormat)
    } else {
      const result = await props.onDrop(acceptedFiles)
      setState(result ? states.default : states.badFile)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div className='dragFile' {...getRootProps()}>
      <input {...getInputProps()} />
      <p>{isDragActive ? 'Rilascia il file qui...' : state}</p>
    </div>
  )
}

export default DragDrop
