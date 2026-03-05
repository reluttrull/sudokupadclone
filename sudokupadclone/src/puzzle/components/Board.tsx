import Square from './Square'
import { type Cell } from '../interfaces'

interface BoardProps {
    cells: Cell[],
    errorIndices: number[],
    selectedSquare: number | null,
    onSelectedSquareChanged: (square: number) => void
};

function Board({ cells, errorIndices, selectedSquare, onSelectedSquareChanged }: BoardProps) {

    const handleSquareSelected = (square: number) => {
        onSelectedSquareChanged(square);
    };

    return (
        <>
            <div className="board">
                {cells.map((cell) => (<Square
                    key={`square${cell.index}`}
                    cellData={cell}
                    hasError={errorIndices.includes(cell.index)}
                    isSelected={cell.index === selectedSquare}
                    onSquareSelected={handleSquareSelected} />
                ))}
            </div>
        </>
    )
}
export default Board