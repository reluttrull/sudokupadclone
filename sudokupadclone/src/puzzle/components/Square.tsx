import { type Cell } from '../interfaces'

interface SquareProps {
    cellData: Cell,
    hasError: boolean,
    isSelected: boolean
};

function Square({ cellData, hasError, isSelected }: SquareProps) {

    const getClasses = () => {
        if (hasError) return 'error-square square';
        if (isSelected) return 'selected-square square';
        return 'square';
    }

    const getBackground = () => {
        if (cellData.colors.length === 0) return undefined;

        const step = 100 / cellData.colors.length;

        const gradientStops = cellData.colors
            .map((c, i) => {
                const start = i * step;
                const end = (i + 1) * step;
                return `var(--${c}) ${start}% ${end}%`;
            })
            .join(',');

        return `linear-gradient(135deg, ${gradientStops})`;
    }

    return (
        <>
            <div className={getClasses()} style={{ background: getBackground() }} >
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