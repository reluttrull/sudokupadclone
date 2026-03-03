import { MdBackspace, MdUndo, MdRedo } from 'react-icons/md'
import { RiNumber1, RiNumber2, RiNumber3, RiNumber4, RiNumber5, RiNumber6, RiNumber7, RiNumber8, RiNumber9, RiNumber0 } from 'react-icons/ri'
import { InputType, UserAction } from '../enums'
import { useNumberHotkeys, useControlHotkeys } from '../../utils/useHotkeys'

interface ControlsProps {
    activeInputType: InputType,
    isUndoEnabled: boolean,
    isRedoEnabled: boolean,
    onInputTypeChanged: (inputType: InputType) => void,
    onUserInput: (value: number) => void,
    onUserAction: (userAction: UserAction) => void
};
function Controls({ activeInputType, isUndoEnabled, isRedoEnabled, onInputTypeChanged, onUserInput, onUserAction }: ControlsProps) {
    const numberKeys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    const numberKeyIcons = [RiNumber1, RiNumber2, RiNumber3, RiNumber4, RiNumber5, RiNumber6, RiNumber7, RiNumber8, RiNumber9, RiNumber0];
    useNumberHotkeys(onUserInput);
    useControlHotkeys(onUserAction);

    return (
        <>
            <div className="controls-container">
                <div className="general-controls">
                    <button className="square-button-icon" disabled={!isUndoEnabled} onClick={() => onUserAction(UserAction.Undo)}>
                        <MdUndo />
                    </button>
                    <button className="square-button-icon" disabled={!isRedoEnabled} onClick={() => onUserAction(UserAction.Redo)}>
                        <MdRedo />
                    </button>
                </div>
                <div className="number-pad controls-item">
                    {numberKeys.map((key, index) => {
                        const Icon = numberKeyIcons[index];
                        return (
                            <button key={key} className="number-key square-button-icon" onClick={() => onUserInput(key)}>
                                <Icon />
                            </button>
                        );
                    })}
                    <button className="number-key square-button-icon" onClick={() => onUserAction(UserAction.Backspace)}>
                        <MdBackspace />
                    </button>
                </div>
                <div className="controls-item">
                    <button className={activeInputType == InputType.BigNumber ? 'active-button square-button-icon' : 'inactive-button square-button-icon'}
                                onClick={() => onInputTypeChanged(InputType.BigNumber)} >
                        <img src="/bigNumberInput.png" />
                    </button>
                    <button className={activeInputType == InputType.SmallCenterNumber ? 'active-button square-button-icon' : 'inactive-button square-button-icon'}
                                onClick={() => onInputTypeChanged(InputType.SmallCenterNumber)}>
                        <img src="/smallCenterNumbersInput.png" />
                    </button>
                    <button className={activeInputType == InputType.SmallCornerNumber ? 'active-button square-button-icon' : 'inactive-button square-button-icon'}
                        onClick={() => onInputTypeChanged(InputType.SmallCornerNumber)}>
                        <img src="/smallCornerNumbersInput.png" />
                    </button>
                </div>
            </div>
        </>
    )
}
export default Controls