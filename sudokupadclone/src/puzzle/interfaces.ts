export interface Cell {
    value: number | null;
    centerNotes: number[];
    cornerNotes: number[];
    color: string | null;
    isProvided: boolean;
    index: number;
}