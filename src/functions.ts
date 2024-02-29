// Helper functions that may be used throughout program
import Node from './node.ts';

export class Func {

  // Are two coordinates equal ([x,y] = [x,y]?)
  static coordinatesEqual(arr1: number[] | null, arr2: number[] | null): boolean {
    if (!arr1 || !arr2) {
      return false;
    }

    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
    return true;
  }

  // Check if Start and End nodes have been selected 
  static hasStartAndEnd(start: boolean, end: boolean): boolean {
    if (start && end) {
      return true;
    }
    return false;
  }


  // Walk Back to get the path of coordinates [x,y]
  static walkBackCoordinates(endCoord: number[], grid: Node[][]): number[][] {
    let [row, col] = [endCoord[0], endCoord[1]];
    let parent = grid[row][col].parent;

    if (parent) {
      let parentCoord = [parent.row, parent.col];
      return [...this.walkBackCoordinates(parentCoord, grid), [row, col]]
    }
    else {
      return [[row, col]];
    }
  }

  static changeNodeSelection(keycode: string, el: HTMLElement) {
    if (keycode == 's') {
      el.style.left = "0";
    }
    else if (keycode == 'e') {
      el.style.left = "33.33%";
    }
    else if (keycode == 'w') {
      el.style.left = "66.66%";
    }
  }
}
