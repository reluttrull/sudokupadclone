import { type Cell } from '../interfaces'

interface SquareProps {
    cellData: Cell,
    isSelected: boolean,
    onSquareSelected: (index:number) => void
};

function Square({ cellData, isSelected, onSquareSelected }: SquareProps) {
    const handleSquareClick = () => {
        if (!cellData.isProvided) onSquareSelected(cellData.index);
    };

    return (
        <>
            <div className={isSelected ? 'selected-square square' : 'square'} onClick={handleSquareClick}>
                <span className="square-center-notes square-layer">
                    {cellData.centerNotes.join('')}
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