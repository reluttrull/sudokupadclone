import { useState } from 'react'
import Board from "./Board"
import Controls from "./Controls"
import { InputType } from '../enums'

function Puzzle() {
    const [inputType, setInputType] = useState<InputType>(InputType.None);
    const handleInputTypeChanged = (inputType: InputType) => {
        console.log(inputType == InputType.BigNumber);
        setInputType(inputType);
    }
    

    return (
        <>
            <Board />
            <Controls activeInputType={inputType} onInputTypeChanged={handleInputTypeChanged} />
        </>
    )
}
export default Puzzle