import { StoryObj } from '@storybook/react'

import { Checkbox2 } from './'

const meta = {
  title: 'Components/Checkbox2',
  component: Checkbox2,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Uncontrolled: Story = {
  args: {
    label: 'Click',
    disabled: false,
  },
}
