import React from 'react';
import { RiNumber1, RiNumber2, RiNumber3, RiNumber4, RiNumber5, RiNumber6, RiNumber7, RiNumber8, RiNumber9, RiNumber0 } from 'react-icons/ri'
import { InputType } from '../enums'
import { useHotkeys } from '../../utils/useHotkeys'

console.log('React version in Controls:', React.version);
interface ControlsProps {
    activeInputType: InputType,
    onInputTypeChanged: (inputType: InputType) => void,
    onUserInput: (value: number) => void
};
function Controls({ activeInputType, onInputTypeChanged, onUserInput }: ControlsProps) {
    useHotkeys(onUserInput);

    return (
        <>
            <div className="controls-container">
                <div className="number-pad controls-item">
                    <button className="number-key square-button-icon" onClick={() => onUserInput(1)}>
                        <RiNumber1 />
                    </button >
                    <button className="number-key square-button-icon" onClick={() => onUserInput(2)}>
                        <RiNumber2 />
                    </button >
                    <button className="number-key square-button-icon" onClick={() => onUserInput(3)}>
                        <RiNumber3 />
                    </button >
                    <button className="number-key square-button-icon" onClick={() => onUserInput(4)}>
                        <RiNumber4 />
                    </button >
                    <button className="number-key square-button-icon" onClick={() => onUserInput(5)}>
                        <RiNumber5 />
                    </button >
                    <button className="number-key square-button-icon" onClick={() => onUserInput(6)}>
                        <RiNumber6 />
                    </button >
                    <button className="number-key square-button-icon" onClick={() => onUserInput(7)}>
                        <RiNumber7 />
                    </button >
                    <button className="number-key square-button-icon" onClick={() => onUserInput(8)}>
                        <RiNumber8 />
                    </button >
                    <button className="number-key square-button-icon" onClick={() => onUserInput(9)}>
                        <RiNumber9 />
                    </button >
                    <button className="number-key square-button-icon" onClick={() => onUserInput(0)}>
                        <RiNumber0 />
                    </button >
                </div>
                <div className="controls-item">
                    <div><button className={activeInputType == InputType.BigNumber ? 'active-button square-button-icon' : 'inactive-button square-button-icon'}
                                onClick={() => onInputTypeChanged(InputType.BigNumber)} >
                        <img src="/bigNumberInput.png" />
                    </button></div>
                    <div><button className={activeInputType == InputType.SmallCenterNumber ? 'active-button square-button-icon' : 'inactive-button square-button-icon'}
                                onClick={() => onInputTypeChanged(InputType.SmallCenterNumber)}>
                        <img src="/smallCenterNumbersInput.png" />
                    </button></div>
                    <div><button className={activeInputType == InputType.SmallCornerNumber ? 'active-button square-button-icon' : 'inactive-button square-button-icon'}
                        onClick={() => onInputTypeChanged(InputType.SmallCornerNumber)}>
                        <img src="/smallCornerNumbersInput.png" />
                    </button></div>
                </div>
            </div>
        </>
    )
}
export default Controls