import { Meta, StoryObj } from '@storybook/react'

import { DropdownMenuComponent } from './drop-downComponent.tsx'

const meta = {
  title: 'Components/DropdownMenuComponent',
  component: DropdownMenuComponent,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof DropdownMenuComponent>

export default meta
type Story = StoryObj<typeof meta>

export const DropdownMenuProfile: Story = {
  args: {
    arrItems: ['My Profile', 'Sign Out'],
  },
}

export const DropdownMenu: Story = {
  args: {
    arrItems: ['Learn', 'Edit', 'Delete'],
  },
}
