import { useState } from 'react'
import Square from './Square'
import { type Cell } from '../interfaces'

interface BoardProps {
    cells: Cell[],
    errorIndices: number[],
    selectedSquares: number[],
    onSelectionStart: (square: number) => void,
    onSelectionUpdate: (square: number) => void,
    onSelectionEnd: () => void
};

function Board({ cells, errorIndices, selectedSquares, onSelectionStart, onSelectionUpdate, onSelectionEnd }: BoardProps) {
    const [isDragging, setIsDragging] = useState(false);

    const getChildIndexFromPoint = (x: number, y: number) => {
        const el = document.elementFromPoint(x, y);
        if (!el) return null;

        const child = el.closest("[data-index]");
        if (!child) return null;

        return Number((child as HTMLElement).dataset.index);
    };

    const handleDragStart = (square: number) => {
        setIsDragging(true);
        onSelectionStart(square);
    };

    const handleDragMove = (e: React.PointerEvent) => {
        if (!isDragging) return;
        const index = getChildIndexFromPoint(e.clientX, e.clientY);
        if (index !== null) {
            onSelectionUpdate(index);
        }
    }

    const handleDragEnd = () => {
        setIsDragging(false);
        onSelectionEnd();
    }

    return (
        <>
            <div className="board"
                onPointerUp={handleDragEnd}
                onPointerMove={handleDragMove} >
                {cells.map((cell) => (
                    <div key={`square${cell.index}`}
                        onPointerDown={() => handleDragStart(cell.index)}>
                        <Square
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