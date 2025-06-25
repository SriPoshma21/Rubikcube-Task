function getCubeSvg(cubeStr) {
  const colors = {
    w: '#FFFFFF',
    y: '#FFD500',
    r: '#FF0000',
    o: '#FF8C00',
    g: '#00FF00',
    b: '#0000FF',
  };

  const size = 20; // size of one sticker
  const gap = 2;   // spacing between stickers

  // Face order: U, L, F, R, B, D (each has 9 stickers)
  const faces = {
    U: { x: 3, y: 0 },
    L: { x: 0, y: 1 },
    F: { x: 3, y: 1 },
    R: { x: 6, y: 1 },
    B: { x: 9, y: 1 },
    D: { x: 3, y: 2 },
  };

let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="250">`;


  let i = 0;
  for (const face in faces) {
    const { x: fx, y: fy } = faces[face];
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        const color = colors[cubeStr[i++]];
        const x = (fx + col) * (size + gap);
        const y = (fy + row) * (size + gap);
        svg += `<rect x="${x}" y="${y}" width="${size}" height="${size}" fill="${color}" stroke="#000"/>`;
      }
    }
  }

  svg += `</svg>`;
  return svg;
}
