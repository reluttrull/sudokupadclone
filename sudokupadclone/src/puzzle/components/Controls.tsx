import React from 'react';
import { RiNumber1, RiNumber2, RiNumber3, RiNumber4, RiNumber5, RiNumber6, RiNumber7, RiNumber8, RiNumber9, RiNumber0 } from 'react-icons/ri'
import { InputType } from '../enums'
import { useHotkeys } from '../../utils/useHotkeys'

interface ControlsProps {
    activeInputType: InputType,
    onInputTypeChanged: (inputType: InputType) => void,
    onUserInput: (value: number) => void
};
function Controls({ activeInputType, onInputTypeChanged, onUserInput }: ControlsProps) {
    const numberKeys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    const numberKeyIcons = [RiNumber1, RiNumber2, RiNumber3, RiNumber4, RiNumber5, RiNumber6, RiNumber7, RiNumber8, RiNumber9, RiNumber0];
    useHotkeys(onUserInput);

    return (
        <>
            <div className="controls-container">
                <div className="number-pad controls-item">
                    {numberKeys.map((key, index) => {
                        const Icon = numberKeyIcons[index];
                        return (
                            <button
                                key={key}
                                className="number-key square-button-icon"
                                onClick={() => onUserInput(key)}
                            >
                                <Icon />
                            </button>
                        );
                    })}
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