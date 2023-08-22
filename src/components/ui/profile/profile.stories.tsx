import { Meta, StoryObj } from '@storybook/react'

import { Profile } from './profile.tsx'

const meta = {
  title: 'Components/Profile',
  component: Profile,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Profile>

export default meta
type Story = StoryObj<typeof meta>

export const ProfileComponent: Story = {}
