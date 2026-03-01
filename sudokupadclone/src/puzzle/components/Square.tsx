import { type Cell } from '../interfaces'

interface SquareProps {
    cellData: Cell,
    isSelected: boolean,
    onSquareSelected: (index:number) => void
};

function Square({ cellData, isSelected, onSquareSelected }: SquareProps) {
    return (
        <>
            <div className={isSelected ? 'selected-square square' : 'square'} onClick={() => onSquareSelected(cellData.index)} ><span className="square-value">
                {cellData.isProvided && (<span className="provided-value">{cellData.value}</span>)}
                {!cellData.isProvided && (<span className="entered-value">{cellData.value}</span>)}
            </span></div>
        </>
    )
}
export default Square