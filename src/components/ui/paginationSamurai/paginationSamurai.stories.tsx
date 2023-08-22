import { Meta, StoryObj } from '@storybook/react'

import { PaginationSamurai } from './paginationSamurai.tsx'

const meta = {
  title: 'Components/PaginationSamurai',
  component: PaginationSamurai,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof PaginationSamurai>

export default meta
type Story = StoryObj<typeof meta>

export const PaginationSamuraiComponent: Story = {
  args: {
    allElements: 1200,
  },
}
