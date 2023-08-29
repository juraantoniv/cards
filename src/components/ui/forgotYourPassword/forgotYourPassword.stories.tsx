import { Meta, StoryObj } from '@storybook/react'

import { ForgotYourPassword } from './forgotYourPassword.tsx'

const meta = {
  title: 'Components/ForgotYourPassword',
  component: ForgotYourPassword,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof ForgotYourPassword>

export default meta
type Story = StoryObj<typeof meta>

export const ForgotPassword: Story = {}
