const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const resolution = 25;
canvas.width = 500;
canvas.height = 500;

const COLS = canvas.width / resolution;
const ROWS = canvas.height / resolution;

function buildField () {
    return new Array(COLS).fill(null)
        .map(() => new Array(ROWS).fill(null)
        .map(() => Math.floor(Math.random() * 2)));
}

let field = buildField()

requestAnimationFrame(updateField)

function updateField() {
    field = nextGen(field);
    renderField(field);
    requestAnimationFrame(updateField);
    console.log('Render');
}

function renderField(field) {
    for (let col = 0; col < field.length; col++) {
        for (let row = 0; row < field[col].length; row++) {
            const cell = field[col][row]

            ctx.beginPath();
            ctx.rect(col * resolution, row * resolution, resolution, resolution);
            ctx.fillStyle = cell ? 'black' : 'white';
            ctx.fill();
            ctx.stroke();
        }
    }
}

function nextGen(field) {
    const nextGen = field.map( arr => [...arr] )

    for (let col = 0; col < field.length; col++) {
        for (let row = 0; row < field[col].length; row++) {
            const cell = field[col][row];
            let neighboursCount = 0;
            for (let i = -1; i < 2; i++) {
                for(let j = -1; j < 2; j++){
                    if (i === 0 && j ===0) {
                        continue;
                    }
                    const xCell = col + i;
                    const yCell = row + j;

                    if (xCell >= 0 && yCell >= 0 && xCell < COLS && yCell < ROWS) {
                        const currentNeighbour = field[col + i][row + j]
                        neighboursCount += currentNeighbour
                    }
                }
            }
            if (cell === 1 && neighboursCount < 2 || cell === 1 && neighboursCount > 3) {
                nextGen[col][row] = 0;
            } else if (cell === 0 && neighboursCount === 3) {
                nextGen[col][row] = 1;
            }
        }
    }
    return nextGen;
}