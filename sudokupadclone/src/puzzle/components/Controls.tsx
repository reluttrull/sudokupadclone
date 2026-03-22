import { useState } from 'react'
import { MdBackspace, MdUndo, MdRedo, MdChecklist } from 'react-icons/md'
import { RiNumber1, RiNumber2, RiNumber3, RiNumber4, RiNumber5, RiNumber6, RiNumber7, RiNumber8, RiNumber9, RiNumber0, RiResetLeftFill } from 'react-icons/ri'
import { InputType, UserAction, backgroundColors, Color } from '../enums'
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
    const [isColorModalOpen, setIsColorModalOpen] = useState(false);
    const numberKeys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    const numberKeyIcons = [RiNumber1, RiNumber2, RiNumber3, RiNumber4, RiNumber5, RiNumber6, RiNumber7, RiNumber8, RiNumber9, RiNumber0];
    useNumberHotkeys(onUserInput);
    useControlHotkeys(onUserAction);

    const openBackgroundColorModal = () => {
        setIsColorModalOpen(true);
    }

    const closeBackgroundColorModal = () => {
        setIsColorModalOpen(false);
    }

    const handleBackgroundColorSelected = (inputType: InputType) => {
        onInputTypeChanged(inputType);
        closeBackgroundColorModal();
    }

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
                    <button className="square-button-icon" onClick={() => onUserAction(UserAction.Validate)}>
                        <MdChecklist />
                    </button>
                    <button className="square-button-icon" onClick={() => onUserAction(UserAction.Reset)}>
                        <RiResetLeftFill />
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
                <div className="input-controls controls-item">
                    <button className={activeInputType == InputType.BigNumber ? 'active-button square-button-icon input-control' : 'inactive-button square-button-icon input-control'}
                                onClick={() => onInputTypeChanged(InputType.BigNumber)} >
                        <img src="bigNumberInput.png" />
                    </button>
                    <button className={activeInputType == InputType.SmallCenterNumber ? 'active-button square-button-icon input-control' : 'inactive-button square-button-icon input-control'}
                                onClick={() => onInputTypeChanged(InputType.SmallCenterNumber)}>
                        <img src="smallCenterNumbersInput.png" />
                    </button>
                    <button className={activeInputType == InputType.SmallCornerNumber ? 'active-button square-button-icon input-control' : 'inactive-button square-button-icon input-control'}
                        onClick={() => onInputTypeChanged(InputType.SmallCornerNumber)}>
                        <img src="smallCornerNumbersInput.png" />
                    </button>
                    <button className={backgroundColors.includes(activeInputType) ? 'active-button square-button-icon input-control' : 'inactive-button square-button-icon input-control'}
                        onClick={openBackgroundColorModal}>
                        {!backgroundColors.includes(activeInputType) && <img src="backgroundColors.png" />}
                        {activeInputType === InputType.BackgroundColorBlue && <img src="backgroundColorBlue.png" />}
                        {activeInputType === InputType.BackgroundColorGreen && <img src="backgroundColorGreen.png" />}
                        {activeInputType === InputType.BackgroundColorOrange && <img src="backgroundColorOrange.png" />}
                        {activeInputType === InputType.BackgroundColorPurple && <img src="backgroundColorPurple.png" />}
                        {activeInputType === InputType.BackgroundColorClear && <img src="backgroundColorClear.png" />}
                    </button>
                </div>
            </div>
            {isColorModalOpen && (
                <div className="modal-overlay" onClick={closeBackgroundColorModal}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <h3>Select Background Color</h3>

                        <button onClick={() => handleBackgroundColorSelected(InputType.BackgroundColorGreen)} className={Color.Green}>Green</button>
                        <button onClick={() => handleBackgroundColorSelected(InputType.BackgroundColorPurple)} className={Color.Purple}>Purple</button>
                        <button onClick={() => handleBackgroundColorSelected(InputType.BackgroundColorOrange)} className={Color.Orange}>Orange</button>
                        <button onClick={() => handleBackgroundColorSelected(InputType.BackgroundColorBlue)} className={Color.Blue}>Blue</button>
                        <button onClick={() => handleBackgroundColorSelected(InputType.BackgroundColorClear)} className={Color.Clear}>Clear</button>

                        <button onClick={closeBackgroundColorModal}>Close</button>
                    </div>
                </div>
            )}
        </>
    )
}
export default Controls