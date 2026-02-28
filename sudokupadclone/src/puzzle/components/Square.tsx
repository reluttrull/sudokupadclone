interface SquareProps {
    value: number|null,
    isProvided: boolean
};

function Square({ value, isProvided }: SquareProps) {
    return (
        <>
            <div className="square"><span className="square-value">
                {isProvided && value}
                {!isProvided && " "}
            </span></div>
        </>
    )
}
export default Square