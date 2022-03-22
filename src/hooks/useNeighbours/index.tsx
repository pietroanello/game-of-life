/*
 ** Hooks for the detection of the position of the squares around
 ** each cell inside the finite grid {matrix}
 */

const useNeighbours = (matrix: number[][]) => {
  const getLeftRight = (cell: number[]) => {
    const lastColumnIndex = matrix[0].length - 1
    let [row, col] = cell

    if (col === 0) return [[row, col + 1]]
    if (col === lastColumnIndex) return [[row, col - 1]]
    return [
      [row, col - 1],
      [row, col + 1],
    ]
  }

  const getTopBottom = (cell: number[]) => {
    const lastRowIndex = matrix.length - 1

    let [row, col] = cell

    if (row === 0) return [[row + 1, col]]
    if (row === lastRowIndex) return [[row - 1, col]]
    return [
      [row - 1, col],
      [row + 1, col],
    ]
  }

  const getCorners = (cell: number[]) => {
    const corners: number[][] = []

    const leftRight = getLeftRight(cell)

    leftRight.forEach(cell => {
      getTopBottom(cell).forEach(cell => {
        corners.push(cell)
      })
    })

    return corners
  }

  const getAll = (cell: number[]) => {
    const all: number[][] = []

    getLeftRight(cell).forEach(cell => all.push(cell))
    getTopBottom(cell).forEach(cell => all.push(cell))
    getCorners(cell).forEach(cell => all.push(cell))

    return all
  }

  return { getAll }
}

export default useNeighbours
