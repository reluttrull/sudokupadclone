import { type Cell } from '../puzzle/interfaces'

export function checkSolution(solution: Cell[]) : boolean {
    if (solution.length !== 81) return false;
    if (solution.some(n => n === null)) return false;
    for (let i = 0; i <= 73; i += 9) {
        const row = solution.slice(i, i + 9).map((elem) => { return elem.value ?? 0; });
        console.log('checking row starting at', i, row);
        if (row.reduce((acc, curr) => acc + curr, 0) !== 45) return false;
    }
    for (let i = 0; i <= 8; i++) {
        const col = solution.filter((elem, idx) => idx % 9 === 8).map((elem) => { return elem.value ?? 0; });
        console.log('checking col', i, col);
        if (col.reduce((acc, curr) => acc + curr, 0) !== 45) return false;
    }
    // todo: check boxes
    return true;
}