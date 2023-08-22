import { Meta, StoryObj } from '@storybook/react'

import { CardComponent } from './cardComponent.tsx'

const meta = {
  title: 'Components/CardComponent',
  component: CardComponent,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof CardComponent>

export default meta
type Story = StoryObj<typeof meta>

export const CardFrame: Story = {
  args: {},
}
