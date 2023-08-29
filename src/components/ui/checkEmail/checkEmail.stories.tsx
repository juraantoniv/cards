import { Meta, StoryObj } from '@storybook/react'

import { CheckEmail } from './checkEmail.tsx'

const meta = {
  title: 'Components/CheckEmail',
  component: CheckEmail,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof CheckEmail>

export default meta
type Story = StoryObj<typeof meta>

export const CheckEmailComponent: Story = {}
