export interface Cell {
    value: number | null;
    centerNotes: (number | null)[];
    cornerNotes: (number | null)[];
    color: string | null;
    isProvided: boolean;
    index: number;
}