import { useEffect, useState } from 'react'
import Board from "./Board"
import Controls from "./Controls"
import { InputType, UserAction, backgroundColors, Color } from '../enums'
import { type Cell } from '../interfaces'
import { getSolutionErrorIndices, getConflictIndices } from '../../utils/solutionTools'

interface PuzzleProps {
    cellValues: (number | null)[],
    isPaused: boolean
};
function Puzzle({ cellValues, isPaused }: PuzzleProps) {
    const [inputType, setInputType] = useState<InputType>(InputType.BigNumber);
    const [selectionStart, setSelectionStart] = useState<number | null>(null);
    const [selectedSquares, setSelectedSquares] = useState<number[]>([]);
    const [cells, setCells] = useState<Cell[]>([]);
    const [errorIndices, setErrorIndices] = useState<number[]>([]);
    const [undoStack, setUndoStack] = useState<Cell[][]>([]);
    const [redoStack, setRedoStack] = useState<Cell[][]>([]);

    useEffect(() => {
        const indices = Array.from({ length: 81 }, (_, i) => i);
        indices.sort(() => Math.random() - 0.5);
        const tmp = new Array(81);
        for (let i: number = 0; i < cellValues.length; i++) {
            tmp[i] = { value: cellValues[i], centerNotes: [], cornerNotes: [], colors: [], isProvided: cellValues[i] !== null, index: i };
        }
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCells(tmp);
    }, []);

    const handleInputTypeChanged = (newInputType: InputType) => {
        setInputType(newInputType);
        if (backgroundColors.includes(newInputType)) {
            handleBackgroundColorChange(selectedSquares, newInputType);
        }
    }

    const handleSelectionStart = (index: number) => {
        setSelectionStart(index);
        setSelectedSquares([index]);
    }

    const handleSelectionUpdate = (index: number) => {
        if (selectionStart === null) return;
        if (selectedSquares.includes(index)) return;
        setSelectedSquares([...selectedSquares, index]);
    }

    const handleSelectionEnd = () => {
        if (selectionStart === null) return;

        if (backgroundColors.includes(inputType)) {
            handleBackgroundColorChange(selectedSquares);
        }

        setSelectionStart(null);
    }

    const handleUserInput = (value: number) => {
        switch (inputType) {
            case InputType.BigNumber:
                {
                    const tmp = cells.map((cell) => {
                        if (selectedSquares.includes(cell.index) && !cell.isProvided) return { ...cell, value: value, centerNotes: [], cornerNotes: [] };
                        return cell;
                    });
                    updateUndoStack();
                    setRedoStack([]);
                    setCells(tmp);
                    let errs: number[] = [];
                    for (let i = 0; i < selectedSquares.length; i++) {
                        errs = [...errs, ...getConflictIndices(tmp, selectedSquares[i])];
                    }
                    setErrorIndices([...new Set(errs)]);
                }
                break;
            case InputType.SmallCenterNumber:
                {
                    const tmp = cells.map((cell) => {
                        if (selectedSquares.includes(cell.index)) return { ...cell, centerNotes: [...new Set([...cell.centerNotes, value])] };
                        return cell;
                    });
                    updateUndoStack();
                    setRedoStack([]);
                    setCells(tmp);
                    setErrorIndices([]);
                }
                break;
            case InputType.SmallCornerNumber:
                {
                    const tmp = cells.map((cell) => {
                        if (selectedSquares.includes(cell.index)) return { ...cell, cornerNotes: [...new Set([...cell.cornerNotes, value])] };
                        return cell;
                    });
                    updateUndoStack();
                    setRedoStack([]);
                    setCells(tmp);
                    setErrorIndices([]);
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
            case UserAction.Reset:
                handleReset();
                setErrorIndices([]);
                break;
            case UserAction.ShiftHold:
                handleSelectionStart(selectedSquares[0] ?? 0);
                break;
            case UserAction.ShiftRelease:
                handleSelectionEnd();
                break;
            case UserAction.ShiftUp:
                if (selectedSquares.length < 1) break;
                var fromSquare = selectedSquares[selectedSquares.length - 1];
                var toSquare = getMovedSquare(fromSquare, -9);
                if (toSquare !== null) handleSelectionUpdate(toSquare);
                break;
            case UserAction.ShiftDown:
                if (selectedSquares.length < 1) break;
                var fromSquare = selectedSquares[selectedSquares.length - 1];
                var toSquare = getMovedSquare(fromSquare, 9);
                if (toSquare !== null) handleSelectionUpdate(toSquare);
                break;
            case UserAction.ShiftLeft:
                if (selectedSquares.length < 1) break;
                var fromSquare = selectedSquares[selectedSquares.length - 1];
                var toSquare = getMovedSquare(fromSquare, -1);
                if (toSquare !== null) handleSelectionUpdate(toSquare);
                break;
            case UserAction.ShiftRight:
                if (selectedSquares.length < 1) break;
                var fromSquare = selectedSquares[selectedSquares.length - 1];
                var toSquare = getMovedSquare(fromSquare, 1);
                if (toSquare !== null) handleSelectionUpdate(toSquare);
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
                        if (selectedSquares.includes(cell.index)) return { ...cell, value: null };
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
                        if (selectedSquares.includes(cell.index)) return { ...cell, centerNotes: cell.centerNotes.slice(0, -1) };
                        return cell;
                    });
                    updateUndoStack();
                    setRedoStack([]);
                    setCells(tmp);
                }
                break;
            case InputType.SmallCornerNumber:
                {
                    const tmp = cells.map((cell) => {
                        if (selectedSquares.includes(cell.index)) return { ...cell, cornerNotes: cell.cornerNotes.slice(0, -1) };
                        return cell;
                    });
                    updateUndoStack();
                    setRedoStack([]);
                    setCells(tmp); // todo: consolidate
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
        const result = getSolutionErrorIndices(cells);
        if (result.length === 0) alert('good job!');
        else alert('nope');
        setErrorIndices(result);
    }

    const handleArrowKey = (action: UserAction) => {
        // first, crunch down multiple selected cells to most recent
        const squareToMove: number = selectedSquares.length > 0 ? selectedSquares[selectedSquares.length - 1] : 0;
        let movedSquare: number | null = null;
        switch (action) {
            case UserAction.ArrowUp:
                movedSquare = getMovedSquare(squareToMove, -9);
                break;
            case UserAction.ArrowDown:
                movedSquare = getMovedSquare(squareToMove, 9);
                break;
            case UserAction.ArrowLeft:
                movedSquare = getMovedSquare(squareToMove, -1);
                break;
            case UserAction.ArrowRight:
                movedSquare = getMovedSquare(squareToMove, 1);
                break;
            default:
                break;
        }
        if (movedSquare === null) return;
        setSelectedSquares([movedSquare]);
    }

    const getMovedSquare = (fromSquare: number, moveDiff: number): (number | null) => {
        let toSquare = fromSquare + moveDiff;
        if (toSquare < 0 || toSquare > 80) return null;
        if (fromSquare % 9 === 0 && moveDiff === -1) return null; // left edge
        if (fromSquare % 9 === 8 && moveDiff === 1) return null; // right edge
        return toSquare;
    }

    const handleReset = () => {
        const tmp = cells.map((cell) => {
            return cell.isProvided
                ? { ...cell, centerNotes: [], cornerNotes: [], colors: [] }
                : { ...cell, value: null, centerNotes: [], cornerNotes: [], colors: [] };
        });
        setCells(tmp);
        setUndoStack([]);
        setRedoStack([]);
    }

    const handleBackgroundColorChange = (squares: number[], it: InputType = inputType) => {
        let color = '#ffffff';
        switch (it) {
            case InputType.BackgroundColorGreen:
                color = Color.Green;
                break;
            case InputType.BackgroundColorPurple:
                color = Color.Purple;
                break;
            case InputType.BackgroundColorOrange:
                color = Color.Orange;
                break;
            case InputType.BackgroundColorBlue:
                color = Color.Blue;
                break;
            case InputType.BackgroundColorClear:
                {
                    const tmp = cells.map((cell) => {
                        if (squares.includes(cell.index)) return { ...cell, colors: [] };
                        return cell;
                    });
                    updateUndoStack();
                    setRedoStack([]);
                    setCells(tmp);
                }
                return;
            default:
                break;
        }
        const tmp = cells.map((cell) => {
            if (squares.includes(cell.index)) return { ...cell, colors: cell.colors.includes(color) ? cell.colors.filter((c, _) => c != color) : [...cell.colors, color] };
            return cell;
        });
        updateUndoStack();
        setRedoStack([]);
        setCells(tmp);
    }

    const updateUndoStack = () => {
        setUndoStack(prev => [...prev, structuredClone(cells)]);
    }

    const updateRedoStack = () => {
        setRedoStack(prev => [...prev, structuredClone(cells)]);
    }
    
    return (
        <>
            {!isPaused && <Board cells={cells} errorIndices={errorIndices} selectedSquares={selectedSquares}
                onSelectionStart={handleSelectionStart} onSelectionUpdate={handleSelectionUpdate} onSelectionEnd={handleSelectionEnd} />}
            {isPaused && <h1>Paused</h1> }
            <Controls activeInputType={inputType} isUndoEnabled={undoStack.length > 0} isRedoEnabled={redoStack.length > 0}
                onInputTypeChanged={handleInputTypeChanged} onUserInput={handleUserInput} onUserAction={handleUserAction} />
        </>
    )
}
export default Puzzle