import { useEffect, useState } from 'react'
import Board from "./Board"
import Controls from "./Controls"
import { InputType, UserAction, backgroundColors, Color } from '../enums'
import { type Cell } from '../interfaces'
import { getSolutionErrorIndices, getConflictIndices } from '../../utils/solutionTools'

interface PuzzleProps {
    cellValues: (number|null)[]
};
function Puzzle({ cellValues }: PuzzleProps) {
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
    const handleInputTypeChanged = (inputType: InputType) => {
        setInputType(inputType);
    }

    const handleSelectionStart = (index: number) => {
        setSelectionStart(index);
    }

    const handleSelectionEnd = (idx: number) => {
        console.log('start and end selection', selectionStart, idx);
        if (selectionStart === null) return;
        if (selectionStart === idx) {
            setSelectedSquares([idx]);
            if (backgroundColors.includes(inputType)) {
                handleBackgroundColorChange([idx]);
            }
            setSelectionStart(null);
            return;
        }
        const min = Math.min(idx, selectionStart);
        const max = Math.max(idx, selectionStart);
        const startRow = Math.floor(min / 9);
        const endRow = Math.floor(max / 9);
        let tmp: number[] = [];
        if (startRow === endRow) {
            const length = Math.floor(max - min) + 1;
            tmp = Array.from({ length }, (_, index) => min + index);
            setSelectedSquares(tmp);
        } else {
            const length = Math.floor((max - min) / 9) + 1;
            tmp = Array.from({ length }, (_, index) => min + index * 9);
            setSelectedSquares(tmp);
        }

        if (backgroundColors.includes(inputType)) {
            handleBackgroundColorChange(tmp);
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
        const result = getSolutionErrorIndices(cells);
        if (result.length === 0) alert('good job!');
        else alert('nope');
        setErrorIndices(result);
    }

    const handleArrowKey = (action: UserAction) => {
        // first, crunch down multiple selected cells to most recent
        let squareToMove:number = selectedSquares.length > 0 ? selectedSquares[selectedSquares.length - 1] : 0;
        switch (action) {
            case UserAction.ArrowUp:
                if (squareToMove < 9) return;
                squareToMove -= 9;
                break;
            case UserAction.ArrowDown:
                if (squareToMove > 71) return;
                squareToMove += 9;
                break;
            case UserAction.ArrowLeft:
                if (squareToMove < 1) return;
                if (squareToMove % 9 == 0) return; // left edge
                squareToMove -= 1;
                break;
            case UserAction.ArrowRight:
                if (squareToMove > 79) return;
                if (squareToMove % 9 == 8) return; // right edge
                squareToMove += 1;
                break;
            default:
                break;
        }
        setSelectedSquares([squareToMove]);
    }

    const handleReset = () => {
        const tmp = cells.map((cell) => {
            return cell.isProvided
                ? { ...cell, centerNotes: [], cornerNotes: [] }
                : { ...cell, value: null, centerNotes: [], cornerNotes: [] };
        });
        setCells(tmp);
        setUndoStack([]);
        setRedoStack([]);
    }

    const handleBackgroundColorChange = (squares: number[]) => {
        let color = '#ffffff';
        switch (inputType) {
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
                        if (squares.includes(cell.index)) {
                            console.log('clearing color at index', cell.index);
                            return { ...cell, colors: [] };
                        }
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
        console.log('color', color);
        const tmp = cells.map((cell) => {
            if (squares.includes(cell.index)) {
                console.log('setting color at index', cell.index);
                return { ...cell, colors: cell.colors.includes(color) ? cell.colors.filter((c, _) => c != color) : [...cell.colors, color] };
            }
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
            <Board cells={cells} errorIndices={errorIndices} selectedSquares={selectedSquares} onSelectionStart={handleSelectionStart} onSelectionEnd={handleSelectionEnd} />
            <Controls activeInputType={inputType} isUndoEnabled={undoStack.length > 0} isRedoEnabled={redoStack.length > 0}
                onInputTypeChanged={handleInputTypeChanged} onUserInput={handleUserInput} onUserAction={handleUserAction} />
        </>
    )
}
export default Puzzle