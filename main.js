class RubiksCube {
  constructor() {
    this.faces = {
      top: Array(9).fill(0), bottom: Array(9).fill(1),
      front: Array(9).fill(2), back: Array(9).fill(3),
      right: Array(9).fill(4), left: Array(9).fill(5),
    };
    this.colors = ["white", "yellow", "red", "orange", "blue", "green"];
  }

  reset() {
    this.faces = {
      top: Array(9).fill(0), bottom: Array(9).fill(1),
      front: Array(9).fill(2), back: Array(9).fill(3),
      right: Array(9).fill(4), left: Array(9).fill(5),
    };
  }

  rotateFace(f) {
    const a = this.faces[f], t = [...a];
    a[0] = t[6]; a[1] = t[3]; a[2] = t[0];
    a[3] = t[7]; a[4] = t[4]; a[5] = t[1];
    a[6] = t[8]; a[7] = t[5]; a[8] = t[2];
  }

  R() { this.rotateFace("right");
    const { top, front, bottom, back } = this.faces;
    const t = [top[2], top[5], top[8]];
    [top[2], top[5], top[8]] = [front[2], front[5], front[8]];
    [front[2], front[5], front[8]] = [bottom[2], bottom[5], bottom[8]];
    [bottom[2], bottom[5], bottom[8]] = [back[6], back[3], back[0]];
    [back[6], back[3], back[0]] = t;
  }

  L() { this.rotateFace("left");
    const { top, front, bottom, back } = this.faces;
    const t = [top[0], top[3], top[6]];
    [top[0], top[3], top[6]] = [back[8], back[5], back[2]];
    [back[8], back[5], back[2]] = [bottom[0], bottom[3], bottom[6]];
    [bottom[0], bottom[3], bottom[6]] = [front[0], front[3], front[6]];
    [front[0], front[3], front[6]] = t;
  }

  U() { this.rotateFace("top");
    const { front, right, back, left } = this.faces;
    const t = front.slice(0, 3);
    front.splice(0, 3, ...right.slice(0, 3));
    right.splice(0, 3, ...back.slice(0, 3));
    back.splice(0, 3, ...left.slice(0, 3));
    left.splice(0, 3, ...t);
  }

  D() { this.rotateFace("bottom");
    const { front, right, back, left } = this.faces;
    const t = front.slice(6, 9);
    front.splice(6, 3, ...left.slice(6, 9));
    left.splice(6, 3, ...back.slice(6, 9));
    back.splice(6, 3, ...right.slice(6, 9));
    right.splice(6, 3, ...t);
  }

  F() { this.rotateFace("front");
    const { top, left, bottom, right } = this.faces;
    const t = [top[6], top[7], top[8]];
    [top[6], top[7], top[8]] = [left[8], left[5], left[2]];
    [left[8], left[5], left[2]] = [bottom[2], bottom[1], bottom[0]];
    [bottom[2], bottom[1], bottom[0]] = [right[0], right[3], right[6]];
    [right[0], right[3], right[6]] = t;
  }

  B() { this.rotateFace("back");
    const { top, right, bottom, left } = this.faces;
    const t = [top[0], top[1], top[2]];
    [top[0], top[1], top[2]] = [right[2], right[5], right[8]];
    [right[2], right[5], right[8]] = [bottom[8], bottom[7], bottom[6]];
    [bottom[8], bottom[7], bottom[6]] = [left[6], left[3], left[0]];
    [left[6], left[3], left[0]] = t;
  }

  executeMove(m) {
    const move = m.replace("'", "");
    for (let i = 0; i < (m.includes("'") ? 3 : 1); i++) {
      this[move]();
    }
  }

  generateScramble() {
    const moves = ["R", "R'", "L", "L'", "U", "U'", "D", "D'", "F", "F'", "B", "B'"];
    const scramble = [];
    for (let i = 0; i < 20; i++) {
      scramble.push(moves[Math.floor(Math.random() * moves.length)]);
    }
    scramble.forEach(m => this.executeMove(m));
    return scramble;
  }

  getSolution(scramble) {
    return scramble.slice().reverse().map(m => m.includes("'") ? m[0] : m + "'");
  }
}

class CubeUI {
  constructor() {
    this.cube = new RubiksCube();
    this.scramble = [];
    this.solution = [];
    this.manualIndex = 0;

    this.init();
    this.render();
  }

  init() {
    this.cubeElement = document.getElementById("cube");
    this.instruction = document.getElementById("instruction");
    this.keyDisplay = document.getElementById("keyDisplay");
    this.keyButtons = document.getElementById("keyButtons");

    document.getElementById("scrambleBtn").onclick = () => this.scrambleCube();
    document.getElementById("solveBtn").onclick = () => this.autoSolve();
    document.getElementById("manualSolveBtn").onclick = () => this.manualSolve();
    document.getElementById("resetBtn").onclick = () => this.resetCube();

    document.addEventListener("keydown", (e) => {
      if (!this.solution.length || this.manualIndex >= this.solution.length) return;
      const key = e.key.toUpperCase();
      const expected = this.solution[this.manualIndex];
      if (key === expected[0]) {
        this.cube.executeMove(expected);
        this.manualIndex++;
        this.render();
        this.updateManualInstructions();
      }
    });
  }

  scrambleCube() {
    this.cube.reset();
    this.scramble = this.cube.generateScramble();
    this.solution = this.cube.getSolution(this.scramble);
    this.manualIndex = 0;
    this.render();
    this.instruction.innerText = "Scrambled! Choose Auto Solve or Manual Solve.";
    this.keyButtons.innerHTML = "";
  }

  autoSolve() {
    let i = 0;
    const step = () => {
      if (i < this.solution.length) {
        this.highlightKey(this.solution[i]);
        this.cube.executeMove(this.solution[i++]);
        this.render();
        setTimeout(step, 1000);
      } else {
        this.instruction.innerText = "✅ Cube Solved Automatically!";
      }
    };
    step();
  }

  manualSolve() {
    if (!this.solution.length) return;
    this.manualIndex = 0;
    this.updateManualInstructions();
  }

  updateManualInstructions() {
    if (this.manualIndex < this.solution.length) {
      const move = this.solution[this.manualIndex];
      this.instruction.innerText = `Manual Solve: Press "${move}" key (${this.manualIndex + 1}/${this.solution.length})`;
      this.displayKeyButtons(this.solution.slice(this.manualIndex));
    } else {
      this.instruction.innerText = "🎉 Challenge Completed: Cube Solved!";
      this.keyButtons.innerHTML = "";
    }
  }

  displayKeyButtons(moves) {
    this.keyButtons.innerHTML = "";
    moves.slice(0, 6).forEach((move, i) => {
      const btn = document.createElement("div");
      btn.className = "key-button";
      btn.innerText = move;
      if (i === 0) btn.classList.add("active");
      this.keyButtons.appendChild(btn);
    });
  }

  highlightKey(move) {
    this.keyButtons.innerHTML = `<div class="key-button active">${move}</div>`;
  }

  resetCube() {
    this.cube.reset();
    this.scramble = [];
    this.solution = [];
    this.manualIndex = 0;
    this.instruction.innerText = "";
    this.keyButtons.innerHTML = "";
    this.render();
  }

  render() {
    this.cubeElement.innerHTML = "";
    const layout = [
      ["", "", "", "top", "top", "top", "", "", "", "", "", ""],
      ["", "", "", "top", "top", "top", "", "", "", "", "", ""],
      ["", "", "", "top", "top", "top", "", "", "", "", "", ""],
      ["left", "left", "left", "front", "front", "front", "right", "right", "right", "back", "back", "back"],
      ["left", "left", "left", "front", "front", "front", "right", "right", "right", "back", "back", "back"],
      ["left", "left", "left", "front", "front", "front", "right", "right", "right", "back", "back", "back"],
      ["", "", "", "bottom", "bottom", "bottom", "", "", "", "", "", ""],
      ["", "", "", "bottom", "bottom", "bottom", "", "", "", "", "", ""],
      ["", "", "", "bottom", "bottom", "bottom", "", "", "", "", "", ""],
    ];

    const counts = { top: 0, bottom: 0, front: 0, back: 0, left: 0, right: 0 };
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 12; c++) {
        const face = layout[r][c];
        const div = document.createElement("div");
        if (!face) {
          div.className = "face empty";
        } else {
          const color = this.cube.colors[this.cube.faces[face][counts[face]++]];
          div.className = `face ${color}`;
        }
        this.cubeElement.appendChild(div);
      }
    }
  }
}

document.addEventListener("DOMContentLoaded", () => new CubeUI());
