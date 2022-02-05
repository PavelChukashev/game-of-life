const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const resolution = 40;
canvas.width = 400;
canvas.height = 400;

const COLS = canvas.width / resolution;
const ROWS = canvas.height / resolution;

function buildField () {
    return new Array(COLS).fill(null)
        .map(() => new Array(ROWS).fill(0));
}

const field = buildField()
console.log(field);