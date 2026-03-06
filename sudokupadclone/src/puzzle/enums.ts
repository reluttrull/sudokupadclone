export const InputType = {
    None: 0,
    BigNumber: 1,
    SmallCenterNumber: 2,
    SmallCornerNumber: 3,
    BackgroundColorGreen: 4,
    BackgroundColorPurple: 5,
    BackgroundColorOrange: 6,
    BackgroundColorBlue: 7,
    BackgroundColorWhite: 8
} as const;

export type InputType = typeof InputType[keyof typeof InputType];

export const UserAction = {
    Backspace: 0,
    Undo: 1,
    Redo: 2,
    Validate: 3,
    ArrowUp: 4,
    ArrowDown: 5,
    ArrowLeft: 6,
    ArrowRight: 7,
    Reset: 8
} as const;

export type UserAction = typeof UserAction[keyof typeof UserAction];


export const backgroundColors: InputType[] = [
    InputType.BackgroundColorGreen,
    InputType.BackgroundColorPurple,
    InputType.BackgroundColorOrange,
    InputType.BackgroundColorBlue,
    InputType.BackgroundColorWhite
];

export const Color = {
    Green: 'green-background',
    Purple: 'purple-background',
    Orange: 'orange-background',
    Blue: 'blue-background',
    White: 'white-background'
} as const;

export type Color = typeof Color[keyof typeof Color];