import { action } from '@storybook/addon-actions'
import { Meta, StoryObj } from '@storybook/react'

import { SliderBar } from './slider.tsx'

const meta = {
  title: 'Components/SliderBar',
  component: SliderBar,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof SliderBar>

export default meta
type Story = StoryObj<typeof meta>

export const Slider: Story = {
  args: {
    startArrayValue: [1, 100],
    onValueCommit: action('value slider'),
  },
}
