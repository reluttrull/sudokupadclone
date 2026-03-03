import Square from './Square'
import { type Cell } from '../interfaces'

interface BoardProps {
    cells: Cell[],
    selectedSquare: number | null,
    onSelectedSquareChanged: (square: number) => void
};

function Board({ cells, selectedSquare, onSelectedSquareChanged }: BoardProps) {

    const handleSquareSelected = (square: number) => {
        onSelectedSquareChanged(square);
    };

    return (
        <>
            <div className="board">
                {cells.map((cell) => (<Square
                    key={`square${cell.index}`}
                    cellData={cell}
                    isSelected={cell.index === selectedSquare}
                    onSquareSelected={handleSquareSelected} />
                ))}
            </div>
        </>
    )
}
export default Board