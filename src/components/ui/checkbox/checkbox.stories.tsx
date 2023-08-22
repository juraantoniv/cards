import { useState } from 'react'

import * as Checkbox from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'
import { action } from '@storybook/addon-actions'
import { Meta, StoryObj } from '@storybook/react'

import st from './checkbox.module.scss'
import { CheckboxUniversal } from './checkbox.tsx'

const meta = {
  title: 'Components/CheckboxUniversal',
  component: CheckboxUniversal,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof CheckboxUniversal>

export default meta
type Story = StoryObj<typeof meta>
export const Сhecked: Story = {
  args: {
    checkboxText: 'Текст',
    value: true,
    onChange: action('Click'),
  },
}
export const Unchecked: Story = {
  args: {
    checkboxText: 'Текст',
    value: false,
    onChange: action('Click'),
  },
}
export const CheckboxAction: Story = {
  render: () => {
    const [value, setValue] = useState(false)
    const handlerOnCheckedChange = (value: boolean) => {
      setValue(value)
    }
    const checkboxText = 'Текст'
    const disabled = false

    return (
      <div>
        <label className={st.common}>
          <div className={disabled ? st.blockUnderCheckboxDisabled : st.blockUnderCheckbox}>
            <Checkbox.Root
              onCheckedChange={handlerOnCheckedChange}
              checked={value}
              className={value ? st.checkboxTrue : st.checkboxFalse}
            >
              <Checkbox.Indicator className={st.checkboxIndicator}>
                <CheckIcon />
              </Checkbox.Indicator>
            </Checkbox.Root>
          </div>

          <div>{checkboxText}</div>
        </label>
      </div>
    )
  },
}
