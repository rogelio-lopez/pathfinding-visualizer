/* Depth First Search */
import Node from "../node.ts";
import { Func } from '../functions.ts';


export default function depthFirst(start: number[], end: number[], g: Node[][]): number[][] {
  let grid = g;
  let stack: number[][] = [start];
  let endFound: boolean = false;

  do {
    // first node in queue x & y
    let [x, y] = [stack[0][0], stack[0][1]];
    let stackLoad: number[][] = [];

    for (let i = 0; i < grid[y][x].neighbors.length; i++) {
      let nCoord = grid[y][x].neighbors[i];
      let nNode = grid[nCoord[1]][nCoord[0]];

      nNode.parent = grid[y][x];

      if (Func.coordinatesEqual(nCoord, end)) {
        endFound = true;
        break;
      }
      else if (!nNode.wasChecked && nNode.type !== 'start' && nNode.type !== 'wall') {
        nNode.wasChecked = true;
        stackLoad.push(nCoord);
      }

      //check nodes before adding to the load
      stackLoad.push(grid[y][x].neighbors[i]);
      console.log("stack load:")
      console.log(stackLoad)

      //DOUBLE RESULT?! WHY THO

    }
    stack.unshift(...stackLoad);
    console.log("this is stack:")
    console.log(stack)

    if (stack.length > 10) {
      break
    }
  } while (!endFound)

  return stack;
}
