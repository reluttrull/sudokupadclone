import { type Cell } from '../puzzle/interfaces'

export function checkSolution(solution: Cell[]): number[] {
    // check no dupes
    for (let i = 1; i <= 9; i++) {
        const sameValues = solution.filter(n => n.value == i);
        if (sameValues.length != 9) {
            console.log('too few or too many of value', i);
            return [...new Set(sameValues.map((elem) => { return elem.index; })),
                    ...solution.filter(elem => elem.value === null).map((elem) => { return elem.index; })];
        }
    }
    // rows
    for (let i = 0; i <= 73; i += 9) {
        const row = solution.slice(i, i + 9);
        const rowValues = row.map((elem) => { return elem.value ?? 0; });
        console.log('checking row starting at', i, row);
        if (rowValues.reduce((acc, curr) => acc + curr, 0) !== 45) {
            console.log('problem in row starting at', i, row);
            return [...new Set(row.map((elem) => { return elem.index; }))];
        }
    }
    // cols
    for (let i = 0; i <= 8; i++) {
        const col = solution.filter((elem, idx) => idx % 9 === i);
        const colValues = col.map((elem) => { return elem.value ?? 0; });
        console.log('checking col starting at', i, col);
        if (colValues.reduce((acc, curr) => acc + curr, 0) !== 45) {
            console.log('problem in col starting at', i, col);
            return [...new Set(col.map((elem) => { return elem.index; }))];
        }
    }
    // boxes
    for (let boxStart = 0; boxStart < 8; boxStart += 3) {
        for (let offset = 0; offset <= 54; offset += 27) {
            const b = boxStart + offset;
            const box = solution.filter((elem, idx) => [b, b + 1, b + 2, b + 9, b + 10, b + 11, b + 18, b + 19, b + 20].includes(idx));
            const boxValues = box.map((elem) => { return elem.value ?? 0; });
            console.log('checking box starting at', b, box);
            if (boxValues.reduce((acc, curr) => acc + curr, 0) !== 45) {
                console.log('problem in box starting at', b, box);
                return [...new Set(box.map((elem) => { return elem.index; }))];
            }
        }
    }
    return [];
}