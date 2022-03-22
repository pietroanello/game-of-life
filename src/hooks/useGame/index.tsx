/*
 ** Basic game rules and controls
 */

import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import useNeighbours from '../useNeighbours'

const TIMING = 200 // Time between each status in case of "Play"

const useGame = (
  matrix: number[][],
  setMatrix: Dispatch<SetStateAction<number[][]>>,
  setGeneration: Dispatch<SetStateAction<number>>
) => {
  const { getAll } = useNeighbours(matrix)
  const [play, setPlay] = useState(false)

  const livesOrNot = (cell: number[]) => {
    // After taking out the neighbours position
    // check their status in the original matrix, then apply the rules of the game

    const isAlive = matrix[cell[0]][cell[1]]
    const neighbours = getAll(cell)
    const neighboursAlive = neighbours.filter(cell => matrix[cell[0]][cell[1]] === 1).length

    if (isAlive && (neighboursAlive < 2 || neighboursAlive > 3)) return 0
    if (!isAlive && neighboursAlive === 3) return 1
    return isAlive
  }

  useEffect(() => {
    let timeout
    if (play) {
      timeout = setTimeout(() => {
        nextMove()
      }, TIMING)
    } else {
      timeout && clearTimeout(timeout)
    }
  }, [play, matrix])

  const nextMove = () => {
    setGeneration(prev => prev + 1)
    setMatrix(prev => {
      // Rebuild the matrix replacing the new cell status
      const res: number[][] = []
      for (let i = 0; i < prev.length; i++) {
        res.push([])
        for (let a = 0; a < prev[i].length; a++) {
          const willLive = livesOrNot([i, a])
          res[i][a] = willLive
        }
      }
      return res
    })
  }

  const playPauseGame = (forced: boolean = false) => {
    forced ? setPlay(false) : play ? setPlay(false) : setPlay(true)
  }

  return { nextMove, playPauseGame, play }
}

export default useGame
