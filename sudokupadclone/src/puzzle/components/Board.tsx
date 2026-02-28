import { useState } from 'react'
import Square from './Square'

function Board() {
    const [values] = useState<(number|null)[][]>([
        [null, null, null, 7, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [3, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, 1, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, 8, null, null],
        [null, null, null, null, null, null, null, null, null]
    ]);

    return (
        <div className="board">
            {values.map((row) =>
                (row.map((num) => (<Square value={num} isProvided={num ? true : false} />)))
            )}
        </div>
    )
}
export default Board