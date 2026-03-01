export interface Cell {
    value: number | null;
    centerNotes: (number | null)[];
    cornerNotes: (number | null)[];
    isProvided: boolean;
    index: number;
}

export interface BoardHandleUserInput {
    triggerChange: (val: number) => void;
}