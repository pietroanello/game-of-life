/*
 ** Hooks for the initial loading of the file
 ** and some utilities for visualization
 */

import { useState } from 'react'
import { readFileAsync } from '../../utils'

const DEAD_SYMBOL = '.'

const useLoadFile = () => {
  const [fileContent, setFileContent] = useState<string[]>([])

  const loadFile = async (files: File[]) => {
    if (!files) return

    try {
      const result = ((await readFileAsync(files[0])) as string).split(/\r?\n/)

      const lines: string[] = result.slice(-result[1]?.split(' ')[0])
      const matrix: number[][] = []
      const generation = getGeneration(result)

      lines.forEach((line, index) => {
        matrix.push([])
        line
          .trim()
          .split(' ')
          .forEach(el => matrix[index].push(el === DEAD_SYMBOL ? 0 : 1))
      })

      setFileContent(result)
      return { matrix, generation }
    } catch (error) {
      console.log(error)
    }
  }

  const getGeneration = (file: string[] = []) => {
    const _file = file.length > 0 ? file : fileContent
    const generation = file[0]?.trim().replace(/[^0-9]/g, '')
    return Number(generation)
  }

  const getRows = () => {
    const rows = fileContent[1]?.trim().split(' ')[0]
    return Number(rows)
  }

  const getCols = () => {
    const cols = fileContent[1]?.trim().split(' ')[1]
    return Number(cols)
  }

  const getStartMatrix = () => {
    const lines: string[] = fileContent.slice(-fileContent[1]?.split(' ')[0])
    const matrix: number[][] = []

    lines.forEach((line, index) => {
      matrix.push([])
      line
        .trim()
        .split(' ')
        .forEach(el => matrix[index].push(el === DEAD_SYMBOL ? 0 : 1))
    })

    return matrix
  }

  return { loadFile, getRows, getCols, getStartMatrix }
}

export default useLoadFile
