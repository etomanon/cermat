import React from 'react'

interface Props {
  children?: React.ReactNode
  index: number
  value: number
}

export const TabItem = (props: Props) => {
  const { children, value, index } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
    >
      {value === index && children}
    </div>
  )
}
