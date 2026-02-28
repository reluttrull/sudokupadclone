import { RiNumber9 } from 'react-icons/ri'
import { TbNumber123 } from 'react-icons/tb'
import { InputType } from '../enums'

interface ControlsProps {
    activeInputType: InputType
    onInputTypeChanged:(inputType:InputType) => void
};
function Controls({ activeInputType, onInputTypeChanged }: ControlsProps) {
    return (
        <>
            <button className={activeInputType == InputType.BigNumber ? 'active-button' : 'inactive-button'} onClick={() => onInputTypeChanged(InputType.BigNumber)} >
                <RiNumber9 />
            </button >
            <button className={activeInputType == InputType.SmallCenterNumber ? 'active-button' : 'inactive-button'} onClick={() => onInputTypeChanged(InputType.SmallCenterNumber)}>
                <TbNumber123 />
            </button>
        </>
    )
}
export default Controls