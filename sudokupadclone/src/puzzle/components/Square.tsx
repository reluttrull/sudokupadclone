import { type Cell } from '../interfaces'

interface SquareProps {
    cellData: Cell,
    hasError: boolean,
    isSelected: boolean,
    onSquareSelected: (index:number) => void
};

function Square({ cellData, hasError, isSelected, onSquareSelected }: SquareProps) {
    const handleSquareClick = () => {
        if (!cellData.isProvided) onSquareSelected(cellData.index);
    };

    const getClasses = () => {
        if (hasError) return 'error-square square';
        if (isSelected) return 'selected-square square';
        if (cellData.color != null) return `${cellData.color} square`;
        return 'square';
    }

    return (
        <>
            <div className={getClasses()} onClick={handleSquareClick}>
                <span className="square-center-notes square-layer">
                    {cellData.centerNotes.sort((a, b) => a - b)
                                         .join('')}
                </span>
                <span className="square-corner-notes square-layer">
                    {cellData.cornerNotes.sort((a, b) => a - b)
                                         .slice(0, 4)
                                         .map((val) => (
                        <div className="corner-note">{val}</div>
                    ))}
                </span>
                <span className="square-value square-layer">
                    {cellData.isProvided && (<span className="provided-value">{cellData.value}</span>)}
                    {!cellData.isProvided && (<span className="entered-value">{cellData.value}</span>)}
                </span>
            </div>
        </>
    )
}
export default Square