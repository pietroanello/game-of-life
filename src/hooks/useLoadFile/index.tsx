/*
 ** Hooks for the initial loading of the file
 ** and some utilities for visualization
 */

import { useMemo, useState } from 'react'
import { readFileAsync } from '../../utils'

const DEAD_SYMBOL = '.'
const ALIVE_SYMBOL = '*'

const useLoadFile = () => {
  const [fileContent, setFileContent] = useState<string[]>([])

  const loadFile = async (files: File[]) => {
    if (!files) return

    try {
      const result = ((await readFileAsync(files[0])) as string).split(/\r?\n/).filter(String)

      const rowsNum = Number(result[1]?.trim().split(' ')[0])
      const colsNum = Number(result[1]?.trim().split(' ')[1])
      const lines: string[] = result.slice(-rowsNum)
      const matrix: number[][] = []

      const isEverythingOk = lines.every(line => {
        // check if every line has the right number of elements
        if (line.trim().split(' ').length !== colsNum) return false

        // Check if there are incorrect chars
        const correctSymbols = line
          .trim()
          .split(' ')
          .every(el => {
            if (el === DEAD_SYMBOL || el === ALIVE_SYMBOL) {
              return true
            }
            return false
          })
        return correctSymbols
      })

      // check if there's some extra line or bad formatting
      if (!rowsNum || !colsNum || result[rowsNum + 2] || !isEverythingOk) return false

      lines.forEach((line, index) => {
        matrix.push([])
        line
          .trim()
          .split(' ')
          .forEach(el => {
            matrix[index].push(el === DEAD_SYMBOL ? 0 : 1)
          })
      })
      const generation = getGeneration(result)

      setFileContent(result)
      return { matrix, generation }
    } catch (error) {
      console.log(error)
    }
  }

  const getGeneration = (file: string[] = []) => {
    const generation = file[0]?.trim().replace(/[^0-9]/g, '')
    return Number(generation)
  }

  const numRows = useMemo(() => {
    const rows = fileContent[1]?.trim().split(' ')[0]
    return Number(rows)
  }, [fileContent])

  const numCols = useMemo(() => {
    const cols = fileContent[1]?.trim().split(' ')[1]
    return Number(cols)
  }, [fileContent])

  const getStartMatrix = (result: string[] = []) => {
    const _file = fileContent.length > 0 ? fileContent : result
    const lines: string[] = _file.slice(-_file[1]?.split(' ')[0])
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

  return { loadFile, numRows, numCols, getStartMatrix }
}

export default useLoadFile
