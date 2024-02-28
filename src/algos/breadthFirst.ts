//Breadth First Search
//import Node from '../node.ts';
import { Grid } from '../grid.ts';
import { Func } from '../functions.ts';

export default async function breadthFirst(start: number[], end: number[], G: Grid): Promise<number[][]> {

  let grid = G.grid;
  let queue: number[][] = [start];
  let endFound: boolean = false;

  do {
    // first node in queue x & y
    let [row, col] = [queue[0][0], queue[0][1]];

    grid[row][col].classes.push('checked')

    await G.displayGrid(35);

    // Loop through neighbors for grid[y][x]
    for (let i = 0; i < grid[row][col].neighbors.length; i++) {

      let nCoord = grid[row][col].neighbors[i];
      let nNode = grid[nCoord[0]][nCoord[1]];

      //End
      if (Func.coordinatesEqual(nCoord, end)) {
        nNode.parent = grid[row][col];
        endFound = true;
        break;
      }

      //Check Nodes
      else if (!nNode.wasChecked && nNode.type !== 'start' && nNode.type !== 'wall') {
        queue.push(nCoord);
        nNode.wasChecked = true;
        nNode.parent = grid[row][col];
        nNode.classes.push('queued');
        await G.displayGrid(1);
      }
    }


    // remove first item in queue
    queue = queue.slice(1);

  } while (!endFound);

  // Walks back from end to start to find path cordinated number[]
  return Func.walkBackCoordinates(end, grid);
}
