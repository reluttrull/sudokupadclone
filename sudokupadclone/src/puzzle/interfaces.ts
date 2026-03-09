import { type Difficulty } from './enums'

export interface Cell {
    value: number | null;
    centerNotes: number[];
    cornerNotes: number[];
    color: string | null;
    isProvided: boolean;
    index: number;
}

export interface SamplePuzzle {
    name: string;
    difficulty: Difficulty;
    cellValues: (number | null)[];
}