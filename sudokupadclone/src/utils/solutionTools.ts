import { type Cell } from '../puzzle/interfaces'

export function checkSolution(solution: Cell[]) : boolean {
    if (solution.length !== 81) return false;
    // check no dupes
    for (let i = 1; i <= 9; i++) {
        if (solution.filter(n => n.value == i).length != 9) {
            console.log('too few or too many of value', i);
            return false;
        }
    }
    // rows
    for (let i = 0; i <= 73; i += 9) {
        const row = solution.slice(i, i + 9).map((elem) => { return elem.value ?? 0; });
        console.log('checking row starting at', i, row);
        if (row.reduce((acc, curr) => acc + curr, 0) !== 45) return false;
    }
    // cols
    for (let i = 0; i <= 8; i++) {
        const col = solution.filter((elem, idx) => idx % 9 === 8).map((elem) => { return elem.value ?? 0; });
        console.log('checking col starting at', i, col);
        if (col.reduce((acc, curr) => acc + curr, 0) !== 45) return false;
    }
    // boxes
    for (let boxStart = 0; boxStart < 8; boxStart += 3) {
        for (let offset = 0; offset <= 54; offset += 27) {
            const b = boxStart + offset;
            const box = solution
                .filter((elem, idx) => [b, b + 1, b + 2, b + 9, b + 10, b + 11, b + 18, b + 19, b + 20].includes(idx))
                .map((elem) => { return elem.value ?? 0; });
            console.log('checking box starting at', b, box);
            if (box.reduce((acc, curr) => acc + curr, 0) !== 45) return false;
        }
    }
    return true;
}