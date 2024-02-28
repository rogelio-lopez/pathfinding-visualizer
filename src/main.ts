import { Grid } from './grid.ts';
import { Func } from './functions.ts';
import breadthFirst from './algos/breadthFirst.ts';

let algoSelect = document.querySelector('#AlgoSelect') as HTMLInputElement;
let startBtn = document.querySelector('#StartFinder');
let clearBtn = document.querySelector('#ClearFinder');

/* --- Initialize Grid class --- */
let G = new Grid(document.getElementById('Grid'));
G.displayGrid();


/* --- Node Selection --- */
/* Start & End: Handle node selections on click */
let keyCode: string | null = null;
window.onkeydown = function(e) {
  keyCode = e.key;
}
window.onkeyup = function() {
  keyCode = null;
}

G.htmlEl?.addEventListener('click', function(e) {
  let attr = (e.target as HTMLElement)?.attributes[0].value.split('-');
  let [row, col] = [Number(attr[0]), Number(attr[1])];

  if (keyCode == 's') {
    G.selectStartNode(row, col);
    G.displayGrid();
  }
  else if (keyCode == 'e') {
    G.selectEndNode(row, col);
    G.displayGrid();
  }
});

/* Wall: Handle ability to draw the wall instead of just clicking */
let mousedown: boolean = false;
let lastCoordinate: number[] = [-1, -1];

G.htmlEl?.addEventListener("mousedown", () => {
  mousedown = true;
});
G.htmlEl?.addEventListener("mouseup", () => {
  mousedown = false;
});
G.htmlEl?.addEventListener('mousemove', (e) => {
  if (!mousedown) return;

  let attr = (e.target as HTMLElement)?.attributes[0].value.split('-');
  let [row, col] = [Number(attr[0]), Number(attr[1])];

  if (keyCode == 'w' && !Func.coordinatesEqual(lastCoordinate, [row, col])) {
    G.selectWallNode(row, col);
    G.displayGrid();
    lastCoordinate = [row, col];
  }
})


/* --- Grid Controls --- */
/* Start search */
startBtn?.addEventListener('click', function(e) {
  e.preventDefault();

  if (algoSelect?.value != '') {
    let path = new Promise<number[][]>((resolve, reject) => {
      if (G.start && G.end) {
        resolve(breadthFirst(G.start, G.end, G))
      }
      reject("This was rejected?")
    });
    path.then(data => {
      G.walkBackPathMarking(data)
    })
  }
  else {
    alert("You didn't select a search type thing");
  }
})

/* Clear grid */
clearBtn?.addEventListener('click', function() {
  location.reload();
});


/* --- Resizing Grid --- */
window.addEventListener('resize', function() {
  G = new Grid(document.getElementById('Grid'));
  G.displayGrid();
});
