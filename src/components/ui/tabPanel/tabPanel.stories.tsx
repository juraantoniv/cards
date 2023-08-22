import { useState } from 'react'

import * as Tabs from '@radix-ui/react-tabs'
import { action } from '@storybook/addon-actions'
import { Meta, StoryObj } from '@storybook/react'

import st from './tabPanel.module.scss'
import { itemTabType, TabPanel } from './tabPanel.tsx'

const meta = {
  title: 'Components/TabPanel',
  component: TabPanel,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof TabPanel>

export default meta
type Story = StoryObj<typeof meta>

export const TabPanel1: Story = {
  args: {
    data: [
      { id: 'tab1', name: 'My', onClick: action('ClickMy'), disabled: false },
      { id: 'tab2', name: 'All', onClick: action('ClickAll'), disabled: false },
      { id: 'tab3', name: 'Трейтья', onClick: action('ClickТретья'), disabled: false },
    ],
    active: 'My',
    title: 'Title',
  },
}

export const TabPanel2: Story = {
  args: {
    data: [
      { id: 'tab1', name: 'My', onClick: action('ClickMy'), disabled: false },
      { id: 'tab2', name: 'All', onClick: action('ClickAll'), disabled: false },
      { id: 'tab3', name: 'Трейтья', onClick: action('ClickТретья'), disabled: false },
    ],
    active: 'All',
    title: 'Title',
  },
}

export const TabPanelAction: Story = {
  render: () => {
    const [active, setActive] = useState('My')

    const handlerTabPanel1 = (name: string) => {
      setActive(name)
    }
    const handlerTabPanel2 = (name: string) => {
      setActive(name)
    }
    const handlerTabPanel3 = (name: string) => {
      setActive(name)
    }
    const data = [
      { id: 'tab1', name: 'My', onClick: handlerTabPanel1, disabled: false },
      { id: 'tab2', name: 'All', onClick: handlerTabPanel2, disabled: false },
      { id: 'tab3', name: 'Трейтья', onClick: handlerTabPanel3, disabled: false },
    ]

    return (
      <Tabs.Root>
        <Tabs.List>
          {data.map((e: itemTabType) => {
            return (
              <Tabs.Trigger
                disabled={e.disabled}
                onClick={() => e.onClick(e.name)}
                key={e.id}
                className={active === e.name ? st.active : st.tabTrigger}
                value={e.id}
              >
                {e.name}
              </Tabs.Trigger>
            )
          })}
        </Tabs.List>
      </Tabs.Root>
    )
  },
  args: {
    data: [
      { id: 'tab1', name: 'My', onClick: action('ClickMy'), disabled: false },
      { id: 'tab2', name: 'All', onClick: action('ClickAll'), disabled: false },
      { id: 'tab3', name: 'Трейтья', onClick: action('ClickТретья'), disabled: false },
    ],
    active: 'All',
    title: 'Title',
  },
}
