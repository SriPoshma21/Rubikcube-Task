class Cube {
  constructor() {
    this.faces = {
      U: Array(9).fill('w'),
      D: Array(9).fill('y'),
      F: Array(9).fill('g'),
      B: Array(9).fill('b'),
      L: Array(9).fill('o'),
      R: Array(9).fill('r'),
    };
    this.moves = [];
  }

  toString() {
    return Object.values(this.faces).flat().join('');
  }

  rotateFace(face, clockwise = true) {
    const f = this.faces[face];
    const rotated = clockwise
      ? [f[6], f[3], f[0], f[7], f[4], f[1], f[8], f[5], f[2]]
      : [f[2], f[5], f[8], f[1], f[4], f[7], f[0], f[3], f[6]];
    this.faces[face] = rotated;
  }

 rotateX(layer, clockwise = true) {
  const { U, D, F, B, L, R } = this.faces;

  if (layer === 'R') {
    this.rotateFace('R', clockwise);

    const u = [U[2], U[5], U[8]];
    const f = [F[2], F[5], F[8]];
    const d = [D[2], D[5], D[8]];
    const b = [B[6], B[3], B[0]];

    if (clockwise) {
      [F[2], F[5], F[8]] = u;
      [D[2], D[5], D[8]] = f;
      [B[6], B[3], B[0]] = d;
      [U[2], U[5], U[8]] = b;
    } else {
      [B[6], B[3], B[0]] = u;
      [D[2], D[5], D[8]] = b;
      [F[2], F[5], F[8]] = d;
      [U[2], U[5], U[8]] = f;
    }
  }

  else if (layer === 'L') {
    this.rotateFace('L', clockwise);

    const u = [U[0], U[3], U[6]];
    const f = [F[0], F[3], F[6]];
    const d = [D[0], D[3], D[6]];
    const b = [B[8], B[5], B[2]];

    if (clockwise) {
      [F[0], F[3], F[6]] = u;
      [D[0], D[3], D[6]] = f;
      [B[8], B[5], B[2]] = d;
      [U[0], U[3], U[6]] = b;
    } else {
      [B[8], B[5], B[2]] = u;
      [D[0], D[3], D[6]] = b;
      [F[0], F[3], F[6]] = d;
      [U[0], U[3], U[6]] = f;
    }
  }

  else if (layer === 'M') {
    const u = [U[1], U[4], U[7]];
    const f = [F[1], F[4], F[7]];
    const d = [D[1], D[4], D[7]];
    const b = [B[7], B[4], B[1]];

    if (clockwise) {
      [F[1], F[4], F[7]] = u;
      [D[1], D[4], D[7]] = f;
      [B[7], B[4], B[1]] = d;
      [U[1], U[4], U[7]] = b;
    } else {
      [B[7], B[4], B[1]] = u;
      [D[1], D[4], D[7]] = b;
      [F[1], F[4], F[7]] = d;
      [U[1], U[4], U[7]] = f;
    }
  }
}


  rotateY(layer, clockwise = true) {
  const { U, D, F, B, L, R } = this.faces;

  if (layer === 'U') {
    this.rotateFace('U', clockwise);

    const f = F.slice(0, 3);
    const r = R.slice(0, 3);
    const b = B.slice(0, 3);
    const l = L.slice(0, 3);

    if (clockwise) {
      [R[0], R[1], R[2]] = f;
      [B[0], B[1], B[2]] = r;
      [L[0], L[1], L[2]] = b;
      [F[0], F[1], F[2]] = l;
    } else {
      [L[0], L[1], L[2]] = f;
      [B[0], B[1], B[2]] = l;
      [R[0], R[1], R[2]] = b;
      [F[0], F[1], F[2]] = r;
    }
  }

  else if (layer === 'D') {
    this.rotateFace('D', clockwise);

    const f = F.slice(6, 9);
    const r = R.slice(6, 9);
    const b = B.slice(6, 9);
    const l = L.slice(6, 9);

    if (clockwise) {
      [R[6], R[7], R[8]] = f;
      [B[6], B[7], B[8]] = r;
      [L[6], L[7], L[8]] = b;
      [F[6], F[7], F[8]] = l;
    } else {
      [L[6], L[7], L[8]] = f;
      [B[6], B[7], B[8]] = l;
      [R[6], R[7], R[8]] = b;
      [F[6], F[7], F[8]] = r;
    }
  }

  else if (layer === 'E') {
    const f = [F[3], F[4], F[5]];
    const r = [R[3], R[4], R[5]];
    const b = [B[3], B[4], B[5]];
    const l = [L[3], L[4], L[5]];

    if (clockwise) {
      [R[3], R[4], R[5]] = f;
      [B[3], B[4], B[5]] = r;
      [L[3], L[4], L[5]] = b;
      [F[3], F[4], F[5]] = l;
    } else {
      [L[3], L[4], L[5]] = f;
      [B[3], B[4], B[5]] = l;
      [R[3], R[4], R[5]] = b;
      [F[3], F[4], F[5]] = r;
    }
  }
}

rotateZ(layer, clockwise = true) {
  const { U, D, F, B, L, R } = this.faces;

  if (layer === 'F') {
    this.rotateFace('F', clockwise);

    const u = [U[6], U[7], U[8]];
    const r = [R[0], R[3], R[6]];
    const d = [D[2], D[1], D[0]];
    const l = [L[8], L[5], L[2]];

    if (clockwise) {
      [R[0], R[3], R[6]] = u;
      [D[0], D[1], D[2]] = r.reverse();
      [L[2], L[5], L[8]] = d;
      [U[6], U[7], U[8]] = l.reverse();
    } else {
      [L[2], L[5], L[8]] = u.reverse();
      [D[0], D[1], D[2]] = l;
      [R[0], R[3], R[6]] = d.reverse();
      [U[6], U[7], U[8]] = r;
    }
  }

  else if (layer === 'B') {
    this.rotateFace('B', clockwise);

    const u = [U[2], U[1], U[0]];
    const r = [R[2], R[5], R[8]];
    const d = [D[6], D[7], D[8]];
    const l = [L[0], L[3], L[6]];

    if (clockwise) {
      [L[0], L[3], L[6]] = u;
      [D[6], D[7], D[8]] = l.reverse();
      [R[2], R[5], R[8]] = d;
      [U[0], U[1], U[2]] = r.reverse();
    } else {
      [R[2], R[5], R[8]] = u.reverse();
      [D[6], D[7], D[8]] = r;
      [L[0], L[3], L[6]] = d.reverse();
      [U[0], U[1], U[2]] = l;
    }
  }

  else if (layer === 'S') {
    const u = [U[3], U[4], U[5]];
    const r = [R[1], R[4], R[7]];
    const d = [D[5], D[4], D[3]];
    const l = [L[7], L[4], L[1]];

    if (clockwise) {
      [R[1], R[4], R[7]] = u;
      [D[3], D[4], D[5]] = r.reverse();
      [L[1], L[4], L[7]] = d;
      [U[3], U[4], U[5]] = l.reverse();
    } else {
      [L[1], L[4], L[7]] = u.reverse();
      [D[3], D[4], D[5]] = l;
      [R[1], R[4], R[7]] = d.reverse();
      [U[3], U[4], U[5]] = r;
    }
  }
}


  makeMove(key, reverse = false) {
    const moveMap = {
      q: () => this.rotateX('L', !reverse),
      w: () => this.rotateX('M', !reverse),
      e: () => this.rotateX('R', !reverse),
      i: () => this.rotateY('U', !reverse),
      o: () => this.rotateY('E', !reverse),
      p: () => this.rotateY('D', !reverse),
      f: () => this.rotateZ('F', !reverse),
      d: () => this.rotateZ('S', !reverse),
      h: () => this.rotateZ('B', !reverse),
    };
    if (moveMap[key]) {
      moveMap[key]();
      this.moves.push(key + (reverse ? "'" : ''));
      renderCube();
    }
  }

  scramble() {
    const keys = ['q', 'w', 'e', 'i', 'o', 'p', 'f', 'd', 'h'];
    for (let i = 0; i < 20; i++) {
      const key = keys[Math.floor(Math.random() * keys.length)];
      this.makeMove(key, Math.random() > 0.5);
    }
  }

 solve() {
  this.faces = {
    U: Array(9).fill('w'),
    D: Array(9).fill('y'),
    F: Array(9).fill('g'),
    B: Array(9).fill('b'),
    L: Array(9).fill('o'),
    R: Array(9).fill('r'),
  };
  this.moves = [];
  alert("Cube reset to solved state (stub solver).");
}


}

const cube = new Cube();

function renderCube() {
  document.getElementById('cube').innerHTML = getCubeSvg(cube.toString());
}

function scramble() {
  cube.scramble();
  renderCube();
}

function solveCube() {
  cube.solve();
  renderCube();
}

document.addEventListener('keydown', (e) => {
  const key = e.key.toLowerCase();
  if ("qweiopfdh".includes(key)) {
    cube.makeMove(key, e.shiftKey);
  }
});



