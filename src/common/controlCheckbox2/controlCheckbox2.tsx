import { CheckboxProps } from '@radix-ui/react-checkbox'
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form'

import { Checkbox2 } from '../../components/ui/checkbox2'

type PropsType<T extends FieldValues> = {
  control: Control<T>
  name: FieldPath<T>
  label: string
} & Omit<CheckboxProps, 'onChangeChecked' | 'checked'>

export const ControlCheckbox2 = <T extends FieldValues>({
  label,
  control,
  name,
  ...rest
}: PropsType<T>) => {
  const {
    field: { value: checked, onChange: onChangeChecked },
  } = useController({
    name,
    control,
  })

  return <Checkbox2 {...rest} checked={checked} onChangeChecked={onChangeChecked} label={label} />
}
