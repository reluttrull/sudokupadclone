import { type Cell } from '../puzzle/interfaces'

const boxIndices: number[][] = [
    [0, 1, 2, 9, 10, 11, 18, 19, 20],
    [3, 4, 5, 12, 13, 14, 21, 22, 23],
    [6, 7, 8, 15, 16, 17, 24, 25, 26],
    [27, 28, 29, 36, 37, 38, 45, 46, 47],
    [30, 31, 32, 39, 40, 41, 48, 49, 50],
    [33, 34, 35, 42, 43, 44, 51, 52, 53],
    [54, 55, 56, 63, 64, 65, 72, 73, 74],
    [57, 58, 59, 66, 67, 68, 75, 76, 77],
    [60, 61, 62, 69, 70, 71, 78, 79, 80]
];

export function getConflictIndices(cells: Cell[], changedIndex: number): number[] {
    const conflictIndices: number[] = [];
    const rowStart = Math.trunc(changedIndex / 9) * 9;
    console.log('looking for conflicts with value ' + cells[changedIndex].value + ' at index ' + changedIndex);
    for (let i = rowStart; i < rowStart + 9; i++) {
        if (i === changedIndex) continue;
        if (cells[i].value === cells[changedIndex].value) {
            console.log('found row conflict at index', i);
            conflictIndices.push(i);
        }
    }
    const colStart = changedIndex % 9;
    for (let i = colStart; i < 81; i += 9) {
        if (i === changedIndex) continue;
        if (cells[i].value === cells[changedIndex].value) {
            console.log('found col conflict at index', i);
            conflictIndices.push(i);
        }
    }
    for (let boxnum = 0; boxnum < 9; boxnum++) {
        if (!boxIndices[boxnum].includes(changedIndex)) continue;
        const currBoxIndices = boxIndices[boxnum];
        for (let i = 0; i < 9; i++) {
            if (currBoxIndices[i] === changedIndex) continue;
            if (cells[currBoxIndices[i]].value === cells[changedIndex].value) {
                console.log('found box conflict at index', currBoxIndices[i]);
                conflictIndices.push(currBoxIndices[i]);
            }
        }
    }
    if (conflictIndices.length > 0) conflictIndices.push(changedIndex);
    return [...new Set(conflictIndices)];
}

export function getSolutionErrorIndices(solution: Cell[]): number[] {
    // check unfilled
    const nullCells = solution.filter(elem => elem.value === null);
    if (nullCells.length > 0) {
        console.log('not all cells filled in');
        return [...new Set(nullCells.map((elem) => { return elem.index; }))];
    }
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
        if (rowValues.reduce((acc, curr) => acc + curr, 0) !== 45) {
            console.log('problem in row starting at', i, row);
            return [...new Set(row.map((elem) => { return elem.index; }))];
        }
    }
    // cols
    for (let i = 0; i <= 8; i++) {
        const col = solution.filter((_, idx) => idx % 9 === i);
        const colValues = col.map((elem) => { return elem.value ?? 0; });
        if (colValues.reduce((acc, curr) => acc + curr, 0) !== 45) {
            console.log('problem in col starting at', i, col);
            return [...new Set(col.map((elem) => { return elem.index; }))];
        }
    }
    // boxes
    for (let boxnum = 0; boxnum < 9; boxnum++) {
        const box = solution.filter((_, idx) => boxIndices[boxnum].includes(idx));
        const boxValues = box.map((elem) => { return elem.value ?? 0; });
        if (boxValues.reduce((acc, curr) => acc + curr, 0) !== 45) {
            console.log('problem in box starting at', boxIndices[boxnum][0], box);
            return [...new Set(box.map((elem) => { return elem.index; }))];
        }
    }
    return [];
}