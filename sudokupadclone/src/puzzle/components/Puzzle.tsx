import { useEffect, useState } from 'react'
import Board from "./Board"
import Controls from "./Controls"
import { InputType, UserAction } from '../enums'
import { type Cell } from '../interfaces'

function Puzzle() {
    const [inputType, setInputType] = useState<InputType>(InputType.BigNumber);
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
    const handleInputTypeChanged = (inputType: InputType) => {
        setInputType(inputType);
    }
    const handleSelectedSquareChanged = (square:number) => {
        setSelectedSquare(square);
    }
    const handleUserInput = (value: number) => {
        switch (inputType) {
            case InputType.BigNumber:
                {
                    const tmp = cells.map((cell) => {
                        if (cell.index === selectedSquare) return { ...cell, value: value };
                        return cell;
                    });
                    setCells(tmp);
                }
                break;
            case InputType.SmallCenterNumber:
                {
                    const tmp = cells.map((cell) => {
                        if (cell.index === selectedSquare) return { ...cell, centerNotes: [...cell.centerNotes, value] };
                        return cell;
                    });
                    setCells(tmp);
                }
                break;
            default:
                break;
        }
    }

    const handleUserAction = (userAction: UserAction) => {
        switch (userAction) {
            case UserAction.Backspace:
                handleBackspace();
                break;
            default:
                break;
        }
    }

    const handleBackspace = () => {
        switch (inputType) {
            case InputType.BigNumber:
                {
                    const tmp = cells.map((cell) => {
                        if (cell.index === selectedSquare) return { ...cell, value: null };
                        return cell;
                    });
                    setCells(tmp);
                }
                break;
            case InputType.SmallCenterNumber:
                {
                    if (cells[selectedSquare].length == 0) break;
                    const tmp = cells.map((cell) => {
                        if (cell.index === selectedSquare) return { ...cell, centerNotes: cell.centerNotes.slice(0, -1) };
                        return cell;
                    });
                    setCells(tmp);
                }
                break;
            default:
                break;
        }
    }
    

    return (
        <>
            <Board cells={cells} selectedSquare={selectedSquare} onSelectedSquareChanged={handleSelectedSquareChanged} />
            <Controls activeInputType={inputType} onInputTypeChanged={handleInputTypeChanged} onUserInput={handleUserInput} onUserAction={handleUserAction} />
        </>
    )
}
export default Puzzle