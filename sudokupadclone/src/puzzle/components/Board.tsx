import Square from './Square'
import { type Cell } from '../interfaces'

interface BoardProps {
    cells: Cell[],
    errorIndices: number[],
    selectedSquares: number[],
    onSelectionStart: (square: number) => void,
    onSelectionEnd: (square: number) => void
};

function Board({ cells, errorIndices, selectedSquares, onSelectionStart, onSelectionEnd }: BoardProps) {

    const handleDragStart = (square: number) => {
        onSelectionStart(square);
    };

    const handleDragEnd = (square: number) => {
        onSelectionEnd(square);
    }

    return (
        <>
            <div className="board">
                {cells.map((cell) => (
                    <div onMouseDown={() => handleDragStart(cell.index)} onMouseUp={() => handleDragEnd(cell.index)}>
                        <Square
                        key={`square${cell.index}`}
                        cellData={cell}
                        hasError={errorIndices.includes(cell.index)}
                        isSelected={selectedSquares.includes(cell.index)} />
                    </div>
                ))}
            </div>
        </>
    )
}
export default Board