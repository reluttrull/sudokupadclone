interface SquareProps {
    value: number | null,
    index: number,
    isSelected: boolean,
    isProvided: boolean,
    onSquareSelected: (index:number) => void
};

function Square({ value, index, isSelected, isProvided, onSquareSelected }: SquareProps) {
    return (
        <>
            <div className={isSelected ? 'selected-square square' : 'square'} onClick={() => onSquareSelected(index)} ><span className="square-value">
                {isProvided && value}
                {!isProvided && " "}
            </span></div>
        </>
    )
}
export default Square