import React, { useState } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import MUITab from '@material-ui/core/Tab'
import { TabItem } from './tab-item'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}))

type TabsProps = {
  label: string
  render: React.ReactNode
}

type Props = {
  tabs: TabsProps[]
}

export const TabContainer = ({ tabs }: Props) => {
  const classes = useStyles()
  const [value, setValue] = useState(0)

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
  }

  return (
    <div className={classes.root}>
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
    </div>
  )
}
