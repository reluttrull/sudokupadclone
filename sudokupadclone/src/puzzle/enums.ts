export const InputType = {
    None: 0,
    BigNumber: 1,
    SmallCenterNumber: 2,
    SmallCornerNumber: 3
} as const;

export type InputType = typeof InputType[keyof typeof InputType];