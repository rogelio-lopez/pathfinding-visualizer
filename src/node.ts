/* Reusable interfaces */

type nodeType = 'start' | 'end' | 'wall' | 'path' | null;

export default class Node {
  type: nodeType | null;
  wasChecked: boolean;
  parent: Node | null;
  row: number;
  col: number;
  neighbors: number[][];
  classes: string[];

  constructor(r: number, c: number, n: number[][]) {
    this.type = null;
    this.wasChecked = false;
    this.parent = null;
    this.row = r;
    this.col = c;
    this.neighbors = n;
    this.classes = [];
  }

  getNodeDiv(): HTMLElement {
    let div = document.createElement("div");
    div.setAttribute('coordinate', `${this.row}-${this.col}`);
    div.classList.add("node");
    this.type ? div.classList.add(`${this.type}`) : '';

    if (this.classes.length > 0) {
      this.classes.forEach(c => {
        div.classList.add(c);
      });
    }
    return div;
  }

  refreshNode() {
    let el = document.querySelector(`[coordinate='${this.row}-${this.col}']`);
    this.type ? el?.classList.add(`${this.type}`) : '';

    if (this.classes.length > 0) {
      this.classes.forEach(c => {
        el?.classList.add(c);
      });
    }
  }
}
