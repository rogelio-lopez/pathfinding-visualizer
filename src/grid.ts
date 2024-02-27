// Grid fucntions (Creation, Display)
import { Func } from './functions.ts';
import Node from './node.ts';

export class Grid {
  htmlEl: HTMLElement | null;
  grid: Node[][];
  start: number[] | null;
  end: number[] | null;

  constructor(htmlEl: HTMLElement | null) {
    this.htmlEl = htmlEl;
    this.start = null;
    this.end = null;
    this.grid = this.createGrid();
  }

  /* Create initial grid 2D array of type */
  createGrid(): Node[][] {
    const grid: Array<Array<Node>> = [];
    let width = Math.floor(window.innerWidth / 20);
    let height = Math.floor((window.innerHeight - 150) / 20);

    for (let row = 0; row < height; row++) {
      grid[row] = [];

      for (let col = 0; col < width; col++) {
        grid[row][col] = new Node(row, col, getNeighbors(row, col, width - 1, height - 1));
      }
    }

    return grid;
  }

  /* Display current grid array as html */
  displayGrid() {
    if (this.htmlEl) {
      let width = (Math.floor(window.innerWidth / 20)) * 20;
      this.htmlEl.innerHTML = '';
      this.htmlEl.style.width = `${width}px`

      for (let rws of this.grid) {
        for (let nd of rws) {
          this.htmlEl.append(nd.getNodeDiv());
        }
      }
    }
  }

  /* Marks path from walkBackCoordinates() as isPath = true (visual mainly) */
  async walkBackPathMarking(path: number[][]) {
    let [row, col]: number[] = [];
    for (let nds of path) {
      [row, col] = [nds[0], nds[1]];
      if (this.grid[row][col].type !== 'start' && this.grid[row][col].type !== 'end') {
        this.grid[row][col].type = 'path';
      }
      await delay(50);
      this.displayGrid();
    }
  }

  /* Node selection functions for start, end, and block nodes */
  selectStartNode(row: number, col: number) {
    if (!this.start) { // New start node
      this.grid[row][col].type = 'start';
      this.start = [row, col];
    }
    else { // Update start node
      if (Func.coordinatesEqual([row, col], this.start)) { // Unclick start node
        this.grid[row][col].type = null;
        this.start = null;
      }
      else { // Click different start node
        this.grid[this.start[0]][this.start[1]].type = null;
        this.grid[row][col].type = 'start';
        this.start = [row, col];
      }
    }
  }
  selectEndNode(row: number, col: number) {
    if (!this.end) { // New End node
      this.grid[row][col].type = 'end';
      this.end = [row, col];
    }
    else { // Update End node
      if (Func.coordinatesEqual([row, col], this.end)) { // Unclick End node
        this.grid[row][col].type = null;
        this.end = null;
      }
      else { // Click different start node
        this.grid[this.end[0]][this.end[1]].type = null;
        this.grid[row][col].type = 'end';
        this.end = [row, col];
      }
    }
  }
  selectWallNode(row: number, col: number) {
    if (!this.grid[row][col].type && !Func.coordinatesEqual([row, col], this.start) && !Func.coordinatesEqual([row, col], this.end)) {
      this.grid[row][col].type = 'wall';
    }
    else if (this.grid[row][col].type && !Func.coordinatesEqual([row, col], this.start) && !Func.coordinatesEqual([row, col], this.end)) {
      this.grid[row][col].type = null;
    }
  }
}

//Delay function
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Get the coordinates [x,y] of a Node's neighbors in order of -> (right,bottom,left,top)
function getNeighbors(row: number, col: number, width: number, height: number): number[][] {
  // Corner and left & right column nodes
  if (col == 0 || col == width) {
    // Top corners
    if (row == 0) {
      if (col == 0) {
        return [[row, col + 1], [row + 1, col]];
      }
      else {
        return [[row + 1, col], [row, col - 1]];
      }
    }
    // Bottom corners
    else if (row == height) {
      if (col == 0) {
        return [[row, col + 1], [row - 1, col]];
      }
      else {
        return [[row, col - 1], [row - 1, col]];
      }
    }
    // Left anf right columns 
    else {
      if (col == 0) {
        return [[row, col + 1], [row + 1, col], [row - 1, col]];
      }
      else {
        return [[row + 1, col], [row, col - 1], [row - 1, col]];
      }
    }
  }
  else if (row == 0 || row == height) {   // Top and botton rows 
    if (row == 0) {
      return [[row, col + 1], [row + 1, col], [row, col - 1]];
    }
    else {
      return [[row, col + 1], [row, col - 1], [row - 1, col]];
    }
  }
  else {   // Middle nodes
    return [[row, col + 1], [row + 1, col], [row, col - 1], [row - 1, col]];
  }
}
