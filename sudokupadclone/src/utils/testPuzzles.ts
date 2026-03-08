export const validFinished = [
    1, 2, 3, 4, 5, 6, 7, 8, 9,
    4, 5, 6, 7, 8, 9, 1, 2, 3,
    7, 8, 9, 1, 2, 3, 4, 5, 6,
    2, 3, 1, 5, 6, 4, 8, 9, 7,
    5, 6, 4, 8, 9, 7, 2, 3, 1,
    8, 9, 7, 2, 3, 1, 5, 6, 4,
    3, 1, 2, 6, 4, 5, 9, 7, 8,
    6, 4, 5, 9, 7, 8, 3, 1, 2,
    9, 7, 8, 3, 1, 2, 6, 4, 5
];

export const invalidBoxes = [
    1, 2, 3, 4, 5, 6, 7, 8, 9,
    2, 3, 4, 5, 6, 7, 8, 9, 1,
    3, 4, 5, 6, 7, 8, 9, 1, 2,
    4, 5, 6, 7, 8, 9, 1, 2, 3,
    5, 6, 7, 8, 9, 1, 2, 3, 4,
    6, 7, 8, 9, 1, 2, 3, 4, 5,
    7, 8, 9, 1, 2, 3, 4, 5, 6,
    8, 9, 1, 2, 3, 4, 5, 6, 7,
    9, 1, 2, 3, 4, 5, 6, 7, 8
];

export const samplePuzzles = [
    [
        null, null, null, null, null, 4, null, 7, null,
        null, null, null, null, null, null, null, null, 3,
        null, 4, null, null, 8, null, null, 1, 2,
        null, 6, null, 5, null, null, null, null, 4,
        9, null, null, null, null, null, null, null, null,
        null, 5, null, null, null, null, 9, null, 7,
        5, null, null, null, null, null, 8, null, null,
        null, 2, null, null, null, 7, null, null, 5,
        6, null, 1, 2, 4, null, null, null, null
    ],
    [
        null, 3, null, 7, null, null, null, null, null,
        null, null, null, null, null, 8, null, null, 6,
        6, null, null, null, null, null, null, 8, null,
        3, null, 4, null, 2, null, 1, null, null,
        null, null, null, 8, null, null, 5, null, null,
        null, 5, null, 1, null, null, 6, null, 7,
        1, null, null, null, null, null, null, null, null,
        null, 6, 2, null, null, 3, null, null, 4,
        null, null, null, 4, null, 9, null, null, 1
    ]
];