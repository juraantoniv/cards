import { FC } from 'react'

import * as CheckboxRadix from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'
import * as Label from '@radix-ui/react-label'

import { Typography } from '../typography'

import s from './checkbox2.module.scss'

export type CheckboxProps = {
  checked?: boolean
  onChangeChecked?: (value: boolean) => void
  disabled?: boolean
  label?: string
  id?: string
  className?: string
  required?: boolean
}

export const Checkbox2: FC<CheckboxProps> = ({
  checked,
  onChangeChecked,
  disabled,
  label,
  id,
  className,
  required,
}) => {
  const classNames = {
    container: `${s.container} ${className}`,
    label: `${s.label} ${disabled && s.disabled}`,
    checkedWrapper: `${s.checkedWrapper} ${disabled && s.disabled}`,
    checkboxRoot: `${s.CheckboxRoot} ${disabled && s.disabled}`,
    indicator: s.indicator,
  }

  return (
    <form>
      <div className={classNames.container}>
        <Label.Root asChild>
          <Typography variant="body2" className={classNames.label} as={'label'}>
            <div className={classNames.checkedWrapper}>
              <CheckboxRadix.Root
                className={classNames.checkboxRoot}
                defaultChecked={false}
                checked={checked}
                onCheckedChange={onChangeChecked}
                disabled={disabled}
                required={required}
                id={id}
              >
                <CheckboxRadix.Indicator className={classNames.indicator}>
                  <CheckIcon />
                </CheckboxRadix.Indicator>
              </CheckboxRadix.Root>
            </div>
            {label}
          </Typography>
        </Label.Root>
      </div>
    </form>
  )
}
