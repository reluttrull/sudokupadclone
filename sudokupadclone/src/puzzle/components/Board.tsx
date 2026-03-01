import { useEffect, useState } from 'react'
import Square from './Square'
import { type Cell } from '../interfaces'

function Board() {
    const [selectedSquare, setSelectedSquare] = useState<number | null>(null);
    const mockProvidedValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const [cells, setCells] = useState<Cell[]>([]);

    useEffect(() => {
        const indices = Array.from({ length: 81 }, (_, i) => i);
        indices.sort(() => Math.random() - 0.5);
        const tmp = new Array(81);
        for (let i: number = 0; i < tmp.length; i++) {
            tmp[i] = { value: null, centerNotes: [], cornerNotes: [], isProvided: false, index: i };
        }
        for (let i: number = 0; i < mockProvidedValues.length; i++) {
            tmp[indices[i]] = { ...tmp[indices[i]], value: mockProvidedValues[i], isProvided: true };
        };
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCells(tmp);
    }, []);

    const handleSquareSelected = (square: number) => {
        setSelectedSquare(square);
        console.log(`selected square ${square}`);
    };

    return (
        <>
            <div className="board">
                {cells.map((cell) => (<Square
                    cellData={cell}
                    isSelected={cell.index === selectedSquare}
                    onSquareSelected={handleSquareSelected} />
                ))}
            </div>
        </>
    )
}
export default Board