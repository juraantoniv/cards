import { Meta, StoryObj } from '@storybook/react'

import { EditProfile } from './editProfile.tsx'

const meta = {
  title: 'Components/EditProfile',
  component: EditProfile,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof EditProfile>

export default meta
type Story = StoryObj<typeof meta>

export const ProfileComponent: Story = {}
