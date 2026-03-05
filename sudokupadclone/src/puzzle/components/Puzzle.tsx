import { useEffect, useState } from 'react'
import Board from "./Board"
import Controls from "./Controls"
import { InputType, UserAction } from '../enums'
import { type Cell } from '../interfaces'
import { checkSolution } from '../../utils/solutionTools'
//import { validFinished } from '../../utils/testPuzzles'

function Puzzle() {
    const [inputType, setInputType] = useState<InputType>(InputType.BigNumber);
    const [selectedSquare, setSelectedSquare] = useState<number | null>(null);
    const mockProvidedValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const [cells, setCells] = useState<Cell[]>([]);
    const [errorIndices, setErrorIndices] = useState<number[]>([]);
    const [undoStack, setUndoStack] = useState<Cell[][]>([]);
    const [redoStack, setRedoStack] = useState<Cell[][]>([]);

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
        //for (let i: number = 0; i < validFinished.length; i++) {
        //    tmp[i] = { value: validFinished[i], centerNotes: [], cornerNotes: [], isProvided: false, index: i };
        //}
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
                    updateUndoStack();
                    setRedoStack([]);
                    setCells(tmp);
                }
                break;
            case InputType.SmallCenterNumber:
                {
                    const tmp = cells.map((cell) => {
                        if (cell.index === selectedSquare) return { ...cell, centerNotes: [...cell.centerNotes, value] };
                        return cell;
                    });
                    updateUndoStack();
                    setRedoStack([]);
                    setCells(tmp);
                }
                break;
            default:
                break;
        }
        setErrorIndices([]);
    }

    const handleUserAction = (userAction: UserAction) => {
        switch (userAction) {
            case UserAction.Backspace:
                handleBackspace();
                setErrorIndices([]);
                break;
            case UserAction.Undo:
                handleUndo();
                setErrorIndices([]);
                break;
            case UserAction.Redo:
                handleRedo();
                setErrorIndices([]);
                break;
            case UserAction.Validate:
                setErrorIndices([]);
                handleValidate();
                break;
            case UserAction.ArrowUp:
            case UserAction.ArrowDown:
            case UserAction.ArrowLeft:
            case UserAction.ArrowRight:
                handleArrowKey(userAction);
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
                    updateUndoStack();
                    setRedoStack([]);
                    setCells(tmp);
                }
                break;
            case InputType.SmallCenterNumber:
                {
                    if (selectedSquare !== null && cells[selectedSquare].centerNotes.length === 0) break;
                    const tmp = cells.map((cell) => {
                        if (cell.index === selectedSquare) return { ...cell, centerNotes: cell.centerNotes.slice(0, -1) };
                        return cell;
                    });
                    updateUndoStack();
                    setRedoStack([]);
                    setCells(tmp);
                }
                break;
            default:
                break;
        }
    }

    const handleUndo = () => {
        if (undoStack.length === 0) return;
        updateRedoStack();
        setCells(undoStack[undoStack.length - 1]);
        setUndoStack(undoStack.slice(0, -1));
    }

    const handleRedo = () => {
        if (redoStack.length === 0) return;
        updateUndoStack();
        setCells(redoStack[redoStack.length - 1]);
        setRedoStack(redoStack.slice(0, -1));
    }

    const handleValidate = () => {
        const result = checkSolution(cells);
        if (result.length === 0) alert('good job!');
        else alert('nope');
        setErrorIndices(result);
    }

    const handleArrowKey = (action: UserAction) => {
        switch (action) {
            case UserAction.ArrowUp:
                if (selectedSquare < 9) return;
                setSelectedSquare(selectedSquare - 9);
                break;
            case UserAction.ArrowDown:
                if (selectedSquare > 71) return;
                setSelectedSquare(selectedSquare + 9);
                break;
            case UserAction.ArrowLeft:
                if (selectedSquare < 1) return;
                if (selectedSquare % 9 == 0) return; // left edge
                setSelectedSquare(selectedSquare - 1);
                break;
            case UserAction.ArrowRight:
                if (selectedSquare > 79) return;
                if (selectedSquare % 9 == 8) return; // right edge
                setSelectedSquare(selectedSquare + 1);
                break;
            default:
                break;
        }
    }

    const updateUndoStack = () => {
        const tmp = undoStack;
        tmp.push(structuredClone(cells));
        setUndoStack(tmp);
    }

    const updateRedoStack = () => {
        const tmp = redoStack;
        tmp.push(structuredClone(cells));
        setRedoStack(tmp);
    }
    

    return (
        <>
            <Board cells={cells} errorIndices={errorIndices}  selectedSquare={selectedSquare} onSelectedSquareChanged={handleSelectedSquareChanged} />
            <Controls activeInputType={inputType} isUndoEnabled={undoStack.length > 0} isRedoEnabled={redoStack.length > 0}
                onInputTypeChanged={handleInputTypeChanged} onUserInput={handleUserInput} onUserAction={handleUserAction} />
        </>
    )
}
export default Puzzle