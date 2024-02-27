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

    if (this.classes.length > 1) {
      div.classList.add(...this.classes);
    }

    this.type ? div.classList.add(`${this.type}`) : '';

    return div;
  }

  getClasses(): string {
    let str: string = "";
    this.classes.forEach(c => str += ` ${c}`);
    return str;
  }
}
