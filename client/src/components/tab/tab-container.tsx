import React, { useState } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import MUITab from '@material-ui/core/Tab'
import { TabItem } from './tab-item'
import { ObjectAny } from '@/utils/types/object-any'
import styled from 'styled-components'

type TabsProps = {
  label: string
  render: React.ReactNode
}

type Props = {
  tabs: TabsProps[]
}

export const TabContainer = ({ tabs }: Props) => {
  const [value, setValue] = useState(0)

  const handleChange = (
    event: React.ChangeEvent<ObjectAny>,
    newValue: number
  ) => {
    setValue(newValue)
  }

  return (
    <Wrapper>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="secondary"
          variant="fullWidth"
        >
          {tabs.map((t) => (
            <MUITab key={t.label} label={t.label} />
          ))}
        </Tabs>
      </AppBar>
      {tabs.map((t, i) => (
        <TabItem key={t.label} value={value} index={i}>
          {typeof t.render === 'function' ? t.render() : t.render}
        </TabItem>
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  flex-grow: 1;
`
