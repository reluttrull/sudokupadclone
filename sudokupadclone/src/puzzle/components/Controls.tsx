import { RiNumber1, RiNumber2, RiNumber3, RiNumber4, RiNumber5, RiNumber6, RiNumber7, RiNumber8, RiNumber9, RiNumber0 } from 'react-icons/ri'
import { InputType } from '../enums'

interface ControlsProps {
    activeInputType: InputType
    onInputTypeChanged:(inputType:InputType) => void
};
function Controls({ activeInputType, onInputTypeChanged }: ControlsProps) {
    return (
        <>
            <div className="controls-container">
                <div className="number-pad controls-item">
                    <button className="number-key square-button-icon">
                        <RiNumber1 />
                    </button >
                    <button className="number-key square-button-icon">
                        <RiNumber2 />
                    </button >
                    <button className="number-key square-button-icon">
                        <RiNumber3 />
                    </button >
                    <button className="number-key square-button-icon">
                        <RiNumber4 />
                    </button >
                    <button className="number-key square-button-icon">
                        <RiNumber5 />
                    </button >
                    <button className="number-key square-button-icon">
                        <RiNumber6 />
                    </button >
                    <button className="number-key square-button-icon">
                        <RiNumber7 />
                    </button >
                    <button className="number-key square-button-icon">
                        <RiNumber8 />
                    </button >
                    <button className="number-key square-button-icon">
                        <RiNumber9 />
                    </button >
                    <button className="number-key square-button-icon">
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
                </div>
            </div>
        </>
    )
}
export default Controls