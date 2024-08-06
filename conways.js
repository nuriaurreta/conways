// Inicializo el mapa globalmente
let map = createMap(80, 40);

function createMap(width, height) {
    let map = [];
    for (let i = 0; i < height; i++) {
        let row = [];
        for (let j = 0; j < width; j++) {
            let value = Math.floor(Math.random() * 2);
            row.push(value);
        }
        map.push(row);
    }
    return map;
}

// función para averiguar los vecinos de cada posición
function nVecinos(map, y, x) {
    let count = 0;
    const positions = [
        [0, 1], [0, -1], [1, 0], [-1, 0],
        [1, 1], [1, -1], [-1, -1], [-1, 1]
    ];
    for (let pos of positions) {
        const dY = pos[0];
        const dX = pos[1];
        let newY = y + dY;
        let newX = x + dX;

        // Verifica si la nueva posición está dentro de los límites del mapa
        if (map[newY] !== undefined && map[newY][newX] !== undefined) {
            if (map[newY][newX] === 1)
                count++;
        }
    }
    return count;
}

// función para calcular el siguiente estado
function nextMap(map) {
    const height = map.length;
    const width = map[0].length;
    let newMap = [];

    for (let y = 0; y < height; y++) {
        newMap[y] = [];
        for (let x = 0; x < width; x++) {
            newMap[y][x] = map[y][x];
        }
    }
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const vecinos = nVecinos(map, y, x);
            if (map[y][x] === 1) {
                if (vecinos < 2 || vecinos > 3)
                    newMap[y][x] = 0;
            } else {
                if (vecinos === 3)
                    newMap[y][x] = 1;
            }
        }
    }
    return newMap;
}

// Función para dibujar en el canvas
function drawMap(map) {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const cellSize = 20;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (map[y][x] === 1) {
                ctx.fillStyle = '#ffffff';
            } else {
                ctx.fillStyle = '#000000';
            }
            ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
    }
}

// Función para actualizar el mapa y redibujar
function update() {
    map = nextMap(map);
    drawMap(map);
}

// Función para reiniciar el juego
function restartGame() {
    map = createMap(80, 40);
    drawMap(map);
}

// Añadir evento click al botón para reiniciar el juego
document.getElementById('create-new').addEventListener('click', restartGame);

setInterval(update, 800); // Actualiza cada 800 ms

drawMap(map);