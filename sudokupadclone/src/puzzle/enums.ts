export const InputType = {
    None: 0,
    BigNumber: 1,
    SmallCenterNumber: 2,
    SmallCornerNumber: 3
} as const;

export type InputType = typeof InputType[keyof typeof InputType];

export const UserAction = {
    Backspace: 0,
    Undo: 1,
    Redo: 2,
    Validate: 3
} as const;

export type UserAction = typeof UserAction[keyof typeof UserAction];