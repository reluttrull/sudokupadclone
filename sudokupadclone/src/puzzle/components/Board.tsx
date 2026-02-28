import { useState } from 'react'
import Square from './Square'

function Board() {
    const [selectedSquare, setSelectedSquare] = useState<number | null>(null);
    const [values] = useState<(number|null)[][]>([
        [null, null, null, 7, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [3, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, 1, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, 8, null, null],
        [null, null, null, null, null, null, null, null, null]
    ]);
    const getIndex = (row: number, col: number) => {
        if (row == 0) return col;
        return (row) * 9 + col;
    }

    const handleSquareSelected = (square: number) => {
        setSelectedSquare(square);
        console.log(`selected square ${square}`);
    };

    return (
        <div className="board">
            {values.map((row, rowIndex) =>
            (row.map((num, colIndex) => (<Square
                value={num}
                index={getIndex(rowIndex, colIndex)}
                isSelected={getIndex(rowIndex, colIndex) == selectedSquare}
                isProvided={num ? true : false}
                onSquareSelected={handleSquareSelected} />)))
            )}
        </div>
    )
}
export default Board